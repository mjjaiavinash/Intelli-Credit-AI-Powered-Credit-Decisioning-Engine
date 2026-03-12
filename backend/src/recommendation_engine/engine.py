import numpy as np
import pandas as pd
from typing import Dict, Any, List, Tuple
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
import joblib
from loguru import logger
try:
    import shap
    SHAP_AVAILABLE = True
except ImportError:
    SHAP_AVAILABLE = False

class CreditRecommendationEngine:
    """ML-based credit decisioning with explainability"""
    
    def __init__(self):
        self.classification_model = None
        self.amount_model = None
        self.rate_model = None
        self.scaler = StandardScaler()
        self.feature_names = []
        self.explainer = None
        
    def extract_features(self, data: Dict[str, Any]) -> pd.DataFrame:
        """Extract features from ingested data"""
        features = {}
        
        # Financial features
        financials = data.get('financials', {})
        features['revenue'] = financials.get('revenue', 0)
        features['ebitda'] = financials.get('ebitda', 0)
        features['net_profit'] = financials.get('net_profit', 0)
        features['total_debt'] = financials.get('total_debt', 0)
        features['net_worth'] = financials.get('net_worth', 0)
        features['debt_to_ebitda'] = financials.get('debt_to_ebitda', 0)
        features['debt_to_equity'] = financials.get('debt_to_equity', 0)
        
        # GST features
        gst = data.get('gst', {})
        features['gst_turnover'] = gst.get('total_turnover', 0)
        features['gst_mismatch'] = 1 if gst.get('gstr3b_vs_gstr2a_mismatch', False) else 0
        features['gst_filing_regularity'] = len(gst.get('filing_frequency', []))
        
        # Banking features
        bank = data.get('bank', {})
        features['avg_bank_balance'] = bank.get('average_balance', 0)
        features['total_credits'] = bank.get('total_credits', 0)
        features['total_debits'] = bank.get('total_debits', 0)
        features['bounce_rate'] = bank.get('bounce_rate', 0)
        features['circular_trading'] = 1 if bank.get('circular_trading_detected', False) else 0
        
        # MCA features
        mca = data.get('mca', {})
        features['director_changes'] = mca.get('director_changes', 0)
        features['charge_modifications'] = mca.get('charge_modifications', 0)
        features['paid_up_capital'] = mca.get('paid_up_capital', 0)
        
        # Research features
        research = data.get('research', {})
        features['negative_news_count'] = len([n for n in research.get('news_analysis', []) 
                                               if n.get('sentiment') == 'NEGATIVE'])
        features['promoter_risk_score'] = self._calculate_promoter_risk(research.get('promoter_analysis', {}))
        features['litigation_cases'] = research.get('litigation', {}).get('total_cases', 0)
        features['sector_sentiment'] = self._encode_sentiment(research.get('sector_trends', {}).get('market_sentiment', 'NEUTRAL'))
        
        # Primary insights
        primary = data.get('primary_insights', {})
        features['capacity_utilization'] = primary.get('capacity_utilization', 75)
        features['management_quality'] = primary.get('management_quality_score', 7)
        features['site_visit_score'] = primary.get('site_visit_score', 7)
        
        # Derived features
        if features['revenue'] > 0:
            features['ebitda_margin'] = (features['ebitda'] / features['revenue']) * 100
            features['net_profit_margin'] = (features['net_profit'] / features['revenue']) * 100
        else:
            features['ebitda_margin'] = 0
            features['net_profit_margin'] = 0
        
        # Revenue consistency (GST vs Bank vs Financial statements)
        features['revenue_consistency'] = self._calculate_revenue_consistency(
            features['revenue'], features['gst_turnover'], features['total_credits']
        )
        
        return pd.DataFrame([features])
    
    def _calculate_promoter_risk(self, promoter_analysis: Dict) -> float:
        """Calculate aggregate promoter risk score"""
        if not promoter_analysis:
            return 0
        
        risk_scores = {'LOW': 1, 'MEDIUM': 5, 'HIGH': 10}
        total_risk = sum(risk_scores.get(data.get('risk_level', 'LOW'), 0) 
                        for data in promoter_analysis.values())
        
        return total_risk / len(promoter_analysis) if promoter_analysis else 0
    
    def _encode_sentiment(self, sentiment: str) -> int:
        """Encode sentiment to numerical value"""
        sentiment_map = {'POSITIVE': 3, 'NEUTRAL': 2, 'CAUTIOUS': 1, 'NEGATIVE': 0}
        return sentiment_map.get(sentiment, 2)
    
    def _calculate_revenue_consistency(self, revenue: float, gst_turnover: float, bank_credits: float) -> float:
        """Check consistency across revenue sources"""
        values = [v for v in [revenue, gst_turnover, bank_credits] if v > 0]
        if len(values) < 2:
            return 1.0
        
        mean_val = np.mean(values)
        std_val = np.std(values)
        
        # Coefficient of variation
        cv = std_val / mean_val if mean_val > 0 else 0
        
        # Return consistency score (1 = perfect, 0 = highly inconsistent)
        return max(0, 1 - cv)
    
    def calculate_credit_score(self, features: pd.DataFrame) -> Dict[str, Any]:
        """Calculate credit score using rule-based + ML approach"""
        
        # Rule-based scoring (Five Cs of Credit)
        character_score = self._score_character(features)
        capacity_score = self._score_capacity(features)
        capital_score = self._score_capital(features)
        collateral_score = self._score_collateral(features)
        conditions_score = self._score_conditions(features)
        
        # Weighted average
        weights = {
            'character': 0.25,
            'capacity': 0.30,
            'capital': 0.20,
            'collateral': 0.10,
            'conditions': 0.15
        }
        
        total_score = (
            character_score * weights['character'] +
            capacity_score * weights['capacity'] +
            capital_score * weights['capital'] +
            collateral_score * weights['collateral'] +
            conditions_score * weights['conditions']
        )
        
        # Normalize to 0-1000 scale
        credit_score = int(total_score * 10)
        
        return {
            'credit_score': credit_score,
            'character_score': character_score,
            'capacity_score': capacity_score,
            'capital_score': capital_score,
            'collateral_score': collateral_score,
            'conditions_score': conditions_score,
            'rating': self._get_rating(credit_score)
        }
    
    def _score_character(self, features: pd.DataFrame) -> float:
        """Score based on character (promoter quality, compliance)"""
        score = 100
        
        # Deduct for negative factors
        score -= features['promoter_risk_score'].values[0] * 5
        score -= features['negative_news_count'].values[0] * 2
        score -= features['litigation_cases'].values[0] * 3
        score -= features['director_changes'].values[0] * 5
        score -= features['gst_mismatch'].values[0] * 15
        score -= features['circular_trading'].values[0] * 20
        
        # Add for positive factors
        score += features['management_quality'].values[0] * 2
        
        return max(0, min(100, score))
    
    def _score_capacity(self, features: pd.DataFrame) -> float:
        """Score based on capacity to repay"""
        score = 50
        
        # Check if we have valid financial data
        revenue = features['revenue'].values[0]
        ebitda = features['ebitda'].values[0]
        
        # If no revenue or EBITDA, very low score
        if revenue <= 0 or ebitda <= 0:
            return 20
        
        # EBITDA margin
        ebitda_margin = features['ebitda_margin'].values[0]
        if ebitda_margin > 20:
            score += 20
        elif ebitda_margin > 10:
            score += 10
        elif ebitda_margin < 5:
            score -= 20
        
        # Debt to EBITDA
        debt_to_ebitda = features['debt_to_ebitda'].values[0]
        if debt_to_ebitda < 2:
            score += 20
        elif debt_to_ebitda < 4:
            score += 10
        elif debt_to_ebitda > 6:
            score -= 20
        else:
            score -= 10
        
        # Capacity utilization
        capacity_util = features['capacity_utilization'].values[0]
        if capacity_util > 70:
            score += 10
        elif capacity_util < 40:
            score -= 15
        
        return max(0, min(100, score))
    
    def _score_capital(self, features: pd.DataFrame) -> float:
        """Score based on capital structure"""
        score = 50
        
        net_worth = features['net_worth'].values[0]
        total_debt = features['total_debt'].values[0]
        
        # If negative net worth or very high debt, low score
        if net_worth <= 0:
            return 10
        
        if total_debt > net_worth * 3:
            return 20
        
        # Debt to equity
        debt_to_equity = features['debt_to_equity'].values[0]
        if debt_to_equity < 1:
            score += 30
        elif debt_to_equity < 2:
            score += 15
        elif debt_to_equity > 4:
            score -= 30
        else:
            score -= 10
        
        # Net worth
        if net_worth > 100:  # Assuming crores
            score += 20
        elif net_worth > 50:
            score += 10
        elif net_worth < 10:
            score -= 20
        
        return max(0, min(100, score))
    
    def _score_collateral(self, features: pd.DataFrame) -> float:
        """Score based on collateral"""
        score = 70  # Base score
        
        # Paid up capital as proxy
        paid_up = features['paid_up_capital'].values[0]
        if paid_up > 50:
            score += 20
        elif paid_up > 20:
            score += 10
        
        return max(0, min(100, score))
    
    def _score_conditions(self, features: pd.DataFrame) -> float:
        """Score based on market conditions"""
        score = 50
        
        # Sector sentiment
        sector_sentiment = features['sector_sentiment'].values[0]
        score += sector_sentiment * 10
        
        # Revenue consistency
        revenue_consistency = features['revenue_consistency'].values[0]
        score += revenue_consistency * 30
        
        return max(0, min(100, score))
    
    def _get_rating(self, credit_score: int) -> str:
        """Convert credit score to rating"""
        if credit_score >= 800:
            return 'AAA'
        elif credit_score >= 750:
            return 'AA'
        elif credit_score >= 700:
            return 'A'
        elif credit_score >= 650:
            return 'BBB'
        elif credit_score >= 600:
            return 'BB'
        elif credit_score >= 550:
            return 'B'
        else:
            return 'C'
    
    def recommend_loan_amount(self, features: pd.DataFrame, credit_score: int) -> float:
        """Recommend loan amount based on financials"""
        
        # Base on EBITDA and revenue
        ebitda = features['ebitda'].values[0]
        revenue = features['revenue'].values[0]
        net_worth = features['net_worth'].values[0]
        
        # Conservative approach: 2-3x EBITDA or 0.5x revenue
        max_amount_ebitda = ebitda * 2.5
        max_amount_revenue = revenue * 0.5
        max_amount_networth = net_worth * 1.5
        
        # Take minimum for safety
        recommended_amount = min(max_amount_ebitda, max_amount_revenue, max_amount_networth)
        
        # Adjust based on credit score
        if credit_score < 600:
            recommended_amount *= 0.5
        elif credit_score < 700:
            recommended_amount *= 0.75
        
        return max(0, recommended_amount)
    
    def recommend_interest_rate(self, credit_score: int, base_rate: float = 9.0) -> float:
        """Recommend interest rate based on risk"""
        
        # Risk premium based on credit score
        if credit_score >= 800:
            risk_premium = 0
        elif credit_score >= 750:
            risk_premium = 0.5
        elif credit_score >= 700:
            risk_premium = 1.0
        elif credit_score >= 650:
            risk_premium = 1.5
        elif credit_score >= 600:
            risk_premium = 2.5
        else:
            risk_premium = 4.0
        
        return base_rate + risk_premium
    
    def make_recommendation(self, all_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate final credit recommendation with explainability"""
        
        # Extract features
        features = self.extract_features(all_data)
        
        # Calculate credit score
        scoring = self.calculate_credit_score(features)
        credit_score = scoring['credit_score']
        
        # Determine approval
        approved = credit_score >= 600
        
        # Recommend amount and rate
        loan_amount = self.recommend_loan_amount(features, credit_score) if approved else 0
        interest_rate = self.recommend_interest_rate(credit_score) if approved else 0
        
        # Generate explanation
        explanation = self._generate_explanation(features, scoring, all_data)
        
        recommendation = {
            'decision': 'APPROVED' if approved else 'REJECTED',
            'credit_score': credit_score,
            'rating': scoring['rating'],
            'recommended_loan_amount': round(loan_amount, 2),
            'recommended_interest_rate': round(interest_rate, 2),
            'five_cs_breakdown': {
                'character': scoring['character_score'],
                'capacity': scoring['capacity_score'],
                'capital': scoring['capital_score'],
                'collateral': scoring['collateral_score'],
                'conditions': scoring['conditions_score']
            },
            'explanation': explanation,
            'risk_factors': self._identify_risk_factors(features, all_data),
            'strengths': self._identify_strengths(features, all_data)
        }
        
        return recommendation
    
    def _generate_explanation(self, features: pd.DataFrame, scoring: Dict, all_data: Dict) -> str:
        """Generate human-readable explanation"""
        
        decision = 'APPROVED' if scoring['credit_score'] >= 600 else 'REJECTED'
        
        explanation_parts = [
            f"Credit Decision: {decision}",
            f"Credit Score: {scoring['credit_score']} (Rating: {scoring['rating']})",
            "",
            "Key Factors:",
        ]
        
        # Character
        if scoring['character_score'] < 60:
            explanation_parts.append(f"- Character concerns (Score: {scoring['character_score']}/100)")
            if features['promoter_risk_score'].values[0] > 5:
                explanation_parts.append("  * High promoter risk identified in background research")
            if features['gst_mismatch'].values[0] == 1:
                explanation_parts.append("  * GST return mismatch detected (GSTR-3B vs GSTR-2A)")
            if features['circular_trading'].values[0] == 1:
                explanation_parts.append("  * Potential circular trading pattern in bank statements")
        
        # Capacity
        if scoring['capacity_score'] < 60:
            explanation_parts.append(f"- Capacity concerns (Score: {scoring['capacity_score']}/100)")
            if features['debt_to_ebitda'].values[0] > 4:
                explanation_parts.append(f"  * High debt to EBITDA ratio: {features['debt_to_ebitda'].values[0]:.2f}x")
            if features['capacity_utilization'].values[0] < 50:
                explanation_parts.append(f"  * Low capacity utilization: {features['capacity_utilization'].values[0]}%")
        
        # Capital
        if scoring['capital_score'] < 60:
            explanation_parts.append(f"- Capital structure concerns (Score: {scoring['capital_score']}/100)")
            if features['debt_to_equity'].values[0] > 2:
                explanation_parts.append(f"  * High debt to equity ratio: {features['debt_to_equity'].values[0]:.2f}x")
        
        return "\n".join(explanation_parts)
    
    def _identify_risk_factors(self, features: pd.DataFrame, all_data: Dict) -> List[str]:
        """Identify key risk factors"""
        risks = []
        
        if features['promoter_risk_score'].values[0] > 5:
            risks.append("High promoter risk from background research")
        
        if features['negative_news_count'].values[0] > 5:
            risks.append(f"Significant negative news coverage ({features['negative_news_count'].values[0]} articles)")
        
        if features['litigation_cases'].values[0] > 3:
            risks.append(f"Multiple litigation cases ({features['litigation_cases'].values[0]})")
        
        if features['gst_mismatch'].values[0] == 1:
            risks.append("GST return mismatch detected")
        
        if features['circular_trading'].values[0] == 1:
            risks.append("Potential circular trading detected")
        
        if features['debt_to_ebitda'].values[0] > 4:
            risks.append(f"High leverage (Debt/EBITDA: {features['debt_to_ebitda'].values[0]:.2f}x)")
        
        if features['bounce_rate'].values[0] > 0.05:
            risks.append(f"High payment bounce rate ({features['bounce_rate'].values[0]*100:.1f}%)")
        
        return risks
    
    def _identify_strengths(self, features: pd.DataFrame, all_data: Dict) -> List[str]:
        """Identify key strengths"""
        strengths = []
        
        if features['ebitda_margin'].values[0] > 15:
            strengths.append(f"Strong EBITDA margin ({features['ebitda_margin'].values[0]:.1f}%)")
        
        if features['debt_to_equity'].values[0] < 1:
            strengths.append(f"Conservative leverage (D/E: {features['debt_to_equity'].values[0]:.2f}x)")
        
        if features['revenue_consistency'].values[0] > 0.8:
            strengths.append("High revenue consistency across sources")
        
        if features['capacity_utilization'].values[0] > 70:
            strengths.append(f"Good capacity utilization ({features['capacity_utilization'].values[0]}%)")
        
        if features['management_quality'].values[0] >= 8:
            strengths.append("Strong management quality")
        
        return strengths
