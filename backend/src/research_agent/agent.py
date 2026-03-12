import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Any
from datetime import datetime, timedelta
import json
from loguru import logger
import time

class ResearchAgent:
    """Automated research agent for secondary intelligence gathering"""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        self.research_results = {}
    
    def search_company_news(self, company_name: str, days_back: int = 180) -> List[Dict[str, Any]]:
        """Search for news articles about the company"""
        news_items = []
        
        try:
            # Using Google News RSS (in production, use NewsAPI or similar)
            query = f"{company_name} India"
            search_url = f"https://news.google.com/rss/search?q={query}&hl=en-IN&gl=IN&ceid=IN:en"
            
            response = requests.get(search_url, headers=self.headers, timeout=10)
            soup = BeautifulSoup(response.content, 'xml')
            
            items = soup.find_all('item')[:20]
            
            for item in items:
                news_items.append({
                    'title': item.title.text if item.title else "",
                    'link': item.link.text if item.link else "",
                    'pub_date': item.pubDate.text if item.pubDate else "",
                    'description': item.description.text if item.description else "",
                    'sentiment': self._analyze_sentiment(item.title.text if item.title else "")
                })
            
            logger.info(f"Found {len(news_items)} news articles for {company_name}")
            
        except Exception as e:
            logger.error(f"Error searching news: {e}")
        
        return news_items
    
    def search_promoter_background(self, promoter_names: List[str]) -> Dict[str, Any]:
        """Research promoter backgrounds and reputation"""
        promoter_data = {}
        
        for promoter in promoter_names:
            try:
                # Search for negative news
                negative_keywords = ['fraud', 'scam', 'investigation', 'defaulter', 'wilful defaulter']
                
                search_results = []
                for keyword in negative_keywords:
                    query = f"{promoter} {keyword} India"
                    # Simplified search - in production use proper news API
                    search_results.extend(self._web_search(query, max_results=5))
                
                promoter_data[promoter] = {
                    'negative_news_count': len(search_results),
                    'risk_level': 'HIGH' if len(search_results) > 3 else 'MEDIUM' if len(search_results) > 0 else 'LOW',
                    'articles': search_results
                }
                
            except Exception as e:
                logger.error(f"Error researching promoter {promoter}: {e}")
        
        return promoter_data
    
    def check_litigation_history(self, company_name: str, cin: str = None) -> Dict[str, Any]:
        """Check e-Courts portal for litigation history"""
        # Note: Actual e-Courts integration requires API access or web scraping
        # This is a simplified version
        
        litigation_data = {
            'total_cases': 0,
            'pending_cases': 0,
            'case_types': [],
            'high_value_cases': [],
            'risk_score': 0
        }
        
        try:
            # Simulate e-Courts search
            # In production, integrate with e-Courts API or scrape the portal
            logger.info(f"Checking litigation for {company_name}")
            
            # Placeholder for actual implementation
            litigation_data['search_attempted'] = True
            litigation_data['source'] = 'e-Courts Portal'
            
        except Exception as e:
            logger.error(f"Error checking litigation: {e}")
        
        return litigation_data
    
    def analyze_sector_trends(self, sector: str) -> Dict[str, Any]:
        """Analyze sector-specific trends and regulatory changes"""
        sector_analysis = {
            'sector': sector,
            'recent_regulations': [],
            'market_sentiment': 'NEUTRAL',
            'growth_outlook': 'STABLE',
            'key_risks': []
        }
        
        try:
            # Search for RBI/SEBI regulations
            regulatory_keywords = ['RBI regulation', 'SEBI guideline', 'new policy']
            
            for keyword in regulatory_keywords:
                query = f"{sector} {keyword} India"
                results = self._web_search(query, max_results=5)
                sector_analysis['recent_regulations'].extend(results)
            
            # Analyze sentiment
            negative_count = sum(1 for r in sector_analysis['recent_regulations'] 
                               if self._analyze_sentiment(r.get('title', '')) == 'NEGATIVE')
            
            if negative_count > 3:
                sector_analysis['market_sentiment'] = 'NEGATIVE'
            elif negative_count > 1:
                sector_analysis['market_sentiment'] = 'CAUTIOUS'
            else:
                sector_analysis['market_sentiment'] = 'POSITIVE'
            
        except Exception as e:
            logger.error(f"Error analyzing sector trends: {e}")
        
        return sector_analysis
    
    def check_credit_ratings(self, company_name: str) -> Dict[str, Any]:
        """Search for credit rating reports"""
        ratings = {
            'agencies': [],
            'latest_rating': None,
            'rating_trend': 'STABLE',
            'outlook': 'STABLE'
        }
        
        try:
            # Search for CRISIL, ICRA, CARE ratings
            agencies = ['CRISIL', 'ICRA', 'CARE', 'India Ratings']
            
            for agency in agencies:
                query = f"{company_name} {agency} rating"
                results = self._web_search(query, max_results=3)
                
                if results:
                    ratings['agencies'].append({
                        'agency': agency,
                        'reports': results
                    })
            
        except Exception as e:
            logger.error(f"Error checking credit ratings: {e}")
        
        return ratings
    
    def _web_search(self, query: str, max_results: int = 10) -> List[Dict[str, str]]:
        """Perform web search (simplified version)"""
        results = []
        
        try:
            # Using DuckDuckGo HTML (no API key needed)
            search_url = f"https://html.duckduckgo.com/html/?q={query}"
            response = requests.get(search_url, headers=self.headers, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            result_divs = soup.find_all('div', class_='result')[:max_results]
            
            for div in result_divs:
                title_elem = div.find('a', class_='result__a')
                snippet_elem = div.find('a', class_='result__snippet')
                
                if title_elem:
                    results.append({
                        'title': title_elem.get_text(strip=True),
                        'url': title_elem.get('href', ''),
                        'snippet': snippet_elem.get_text(strip=True) if snippet_elem else ''
                    })
            
            time.sleep(1)  # Rate limiting
            
        except Exception as e:
            logger.error(f"Error in web search: {e}")
        
        return results
    
    def _analyze_sentiment(self, text: str) -> str:
        """Simple sentiment analysis"""
        negative_words = ['fraud', 'scam', 'loss', 'decline', 'default', 'bankruptcy', 
                         'investigation', 'penalty', 'violation', 'lawsuit', 'crisis']
        positive_words = ['growth', 'profit', 'expansion', 'award', 'success', 
                         'innovation', 'partnership', 'acquisition']
        
        text_lower = text.lower()
        
        neg_count = sum(1 for word in negative_words if word in text_lower)
        pos_count = sum(1 for word in positive_words if word in text_lower)
        
        if neg_count > pos_count:
            return 'NEGATIVE'
        elif pos_count > neg_count:
            return 'POSITIVE'
        else:
            return 'NEUTRAL'
    
    def conduct_full_research(self, company_info: Dict[str, Any]) -> Dict[str, Any]:
        """Orchestrate complete secondary research"""
        company_name = company_info.get('company_name')
        promoters = company_info.get('promoters', [])
        sector = company_info.get('sector', 'General')
        
        logger.info(f"Starting comprehensive research for {company_name}")
        
        research_report = {
            'company_name': company_name,
            'research_date': datetime.now().isoformat(),
            'news_analysis': self.search_company_news(company_name),
            'promoter_analysis': self.search_promoter_background(promoters),
            'litigation': self.check_litigation_history(company_name),
            'sector_trends': self.analyze_sector_trends(sector),
            'credit_ratings': self.check_credit_ratings(company_name),
            'overall_risk_flags': []
        }
        
        # Aggregate risk flags
        if research_report['promoter_analysis']:
            high_risk_promoters = [p for p, data in research_report['promoter_analysis'].items() 
                                  if data.get('risk_level') == 'HIGH']
            if high_risk_promoters:
                research_report['overall_risk_flags'].append(
                    f"High risk promoters identified: {', '.join(high_risk_promoters)}"
                )
        
        negative_news = [n for n in research_report['news_analysis'] 
                        if n.get('sentiment') == 'NEGATIVE']
        if len(negative_news) > 5:
            research_report['overall_risk_flags'].append(
                f"Significant negative news coverage: {len(negative_news)} articles"
            )
        
        self.research_results = research_report
        return research_report
