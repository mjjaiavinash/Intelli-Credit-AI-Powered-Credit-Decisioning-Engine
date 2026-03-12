import sys
sys.path.append('./src')

from data_ingestor.ingestor import DataIngestor
from research_agent.agent import ResearchAgent
from recommendation_engine.engine import CreditRecommendationEngine
from cam_generator.generator import CAMGenerator
from typing import Dict, Any
from loguru import logger
import json
from datetime import datetime

class IntelliCreditEngine:
    """Main orchestrator for the Intelli-Credit system"""
    
    def __init__(self, api_key: str = None):
        self.data_ingestor = DataIngestor()
        self.research_agent = ResearchAgent(api_key=api_key)
        self.recommendation_engine = CreditRecommendationEngine()
        self.cam_generator = CAMGenerator()
        
        logger.info("Intelli-Credit Engine initialized")
    
    def process_credit_application(self,
                                   company_info: Dict[str, Any],
                                   data_sources: Dict[str, Any],
                                   primary_insights: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        End-to-end credit appraisal process
        
        Args:
            company_info: Basic company information (name, sector, promoters, etc.)
            data_sources: Paths/data for GST, bank statements, financial statements, etc.
            primary_insights: Qualitative inputs from credit officer
        
        Returns:
            Complete credit appraisal results
        """
        
        logger.info(f"Starting credit appraisal for {company_info.get('company_name')}")
        
        # Step 1: Data Ingestion
        logger.info("Step 1: Ingesting multi-source data...")
        ingested_data = self.data_ingestor.ingest_all(data_sources)
        logger.info("Data ingestion complete")
        
        # Step 2: Secondary Research
        logger.info("Step 2: Conducting secondary research...")
        research_results = self.research_agent.conduct_full_research(company_info)
        logger.info("Secondary research complete")
        
        # Step 3: Combine all data
        combined_data = {
            'financials': ingested_data.get('financials', {}),
            'gst': ingested_data.get('gst', {}),
            'bank': ingested_data.get('bank', {}),
            'mca': ingested_data.get('mca', {}),
            'research': research_results,
            'primary_insights': primary_insights or {}
        }
        
        # Step 4: Generate Recommendation
        logger.info("Step 3: Generating credit recommendation...")
        recommendation = self.recommendation_engine.make_recommendation(combined_data)
        logger.info(f"Recommendation: {recommendation['decision']}")
        
        # Step 5: Generate CAM
        logger.info("Step 4: Generating Credit Appraisal Memo...")
        cam_path = self.cam_generator.generate_cam(
            company_info=company_info,
            data_summary=ingested_data,
            research_summary=research_results,
            recommendation=recommendation,
            primary_insights=primary_insights
        )
        logger.info(f"CAM generated: {cam_path}")
        
        # Compile final results
        results = {
            'company_info': company_info,
            'ingested_data': ingested_data,
            'research_results': research_results,
            'recommendation': recommendation,
            'cam_document_path': cam_path,
            'processing_timestamp': datetime.now().isoformat()
        }
        
        # Save results to JSON
        results_path = cam_path.replace('.docx', '_results.json')
        with open(results_path, 'w') as f:
            json.dump(results, f, indent=2, default=str)
        
        logger.info("Credit appraisal process complete")
        
        return results
    
    def quick_score(self, company_info: Dict[str, Any], data_sources: Dict[str, Any]) -> int:
        """Quick credit score calculation without full CAM generation"""
        
        ingested_data = self.data_ingestor.ingest_all(data_sources)
        
        combined_data = {
            'financials': ingested_data.get('financials', {}),
            'gst': ingested_data.get('gst', {}),
            'bank': ingested_data.get('bank', {}),
            'mca': ingested_data.get('mca', {}),
            'research': {},
            'primary_insights': {}
        }
        
        features = self.recommendation_engine.extract_features(combined_data)
        scoring = self.recommendation_engine.calculate_credit_score(features)
        
        return scoring['credit_score']


def main():
    """Example usage"""
    
    # Initialize engine
    engine = IntelliCreditEngine()
    
    # Sample company information
    company_info = {
        'company_name': 'ABC Manufacturing Pvt Ltd',
        'sector': 'Manufacturing',
        'cin': 'U12345MH2015PTC123456',
        'incorporation_year': 2015,
        'promoters': ['Mr. Rajesh Kumar', 'Mrs. Priya Sharma']
    }
    
    # Sample data sources (in production, these would be actual file paths)
    data_sources = {
        'gst': {
            'gstin': '27AABCU9603R1ZM',
            'gstr3b': [
                {'period': '2023-01', 'total_turnover': 50, 'tax_liability': 5, 'itc_claimed': 3},
                {'period': '2023-02', 'total_turnover': 55, 'tax_liability': 5.5, 'itc_claimed': 3.2}
            ],
            'gstr2a': [
                {'period': '2023-01', 'itc_available': 3.1},
                {'period': '2023-02', 'itc_available': 3.3}
            ]
        },
        'mca': {
            'director_changes': 1,
            'charges': [],
            'compliance_status': 'Active',
            'authorized_capital': 100,
            'paid_up_capital': 75
        }
    }
    
    # Sample primary insights
    primary_insights = {
        'capacity_utilization': 75,
        'management_quality_score': 8,
        'site_visit_score': 7,
        'site_visit_notes': 'Factory well-maintained. Modern machinery observed. Good housekeeping.',
        'management_interview_notes': 'Management appears competent and transparent. Clear growth strategy.'
    }
    
    # Process application
    results = engine.process_credit_application(
        company_info=company_info,
        data_sources=data_sources,
        primary_insights=primary_insights
    )
    
    # Print summary
    print("\n" + "="*60)
    print("CREDIT APPRAISAL SUMMARY")
    print("="*60)
    print(f"Company: {company_info['company_name']}")
    print(f"Decision: {results['recommendation']['decision']}")
    print(f"Credit Score: {results['recommendation']['credit_score']}")
    print(f"Rating: {results['recommendation']['rating']}")
    print(f"Recommended Amount: ₹ {results['recommendation']['recommended_loan_amount']:.2f} Cr")
    print(f"Recommended Rate: {results['recommendation']['recommended_interest_rate']:.2f}%")
    print(f"\nCAM Document: {results['cam_document_path']}")
    print("="*60)


if __name__ == "__main__":
    main()
