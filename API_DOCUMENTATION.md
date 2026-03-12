# API Documentation

## Overview

The Intelli-Credit Engine provides a Python API for programmatic access to credit decisioning functionality.

## Installation

```python
import sys
sys.path.append('./src')

from main import IntelliCreditEngine
```

## Core Classes

### 1. IntelliCreditEngine

Main orchestrator class that coordinates all modules.

#### Constructor

```python
engine = IntelliCreditEngine(api_key: str = None)
```

**Parameters:**
- `api_key` (optional): API key for enhanced NLP features

#### Methods

##### process_credit_application()

Process a complete credit application and generate CAM.

```python
results = engine.process_credit_application(
    company_info: Dict[str, Any],
    data_sources: Dict[str, Any],
    primary_insights: Dict[str, Any] = None
) -> Dict[str, Any]
```

**Parameters:**

- `company_info`: Company details
  ```python
  {
      'company_name': str,
      'sector': str,
      'cin': str,
      'incorporation_year': int,
      'promoters': List[str]
  }
  ```

- `data_sources`: Data sources and file paths
  ```python
  {
      'gst': Dict or str,  # GST data or file path
      'bank_statement': str,  # CSV/Excel file path
      'financial_statements': str,  # PDF file path
      'mca': Dict or str  # MCA data or file path
  }
  ```

- `primary_insights`: Qualitative inputs (optional)
  ```python
  {
      'capacity_utilization': int,  # 0-100
      'management_quality_score': int,  # 1-10
      'site_visit_score': int,  # 1-10
      'site_visit_notes': str,
      'management_interview_notes': str
  }
  ```

**Returns:**

```python
{
    'company_info': Dict,
    'ingested_data': Dict,
    'research_results': Dict,
    'recommendation': {
        'decision': str,  # 'APPROVED' or 'REJECTED'
        'credit_score': int,  # 0-1000
        'rating': str,  # 'AAA' to 'C'
        'recommended_loan_amount': float,
        'recommended_interest_rate': float,
        'five_cs_breakdown': Dict,
        'explanation': str,
        'risk_factors': List[str],
        'strengths': List[str]
    },
    'cam_document_path': str,
    'processing_timestamp': str
}
```

**Example:**

```python
engine = IntelliCreditEngine()

company_info = {
    'company_name': 'ABC Manufacturing Pvt Ltd',
    'sector': 'Manufacturing',
    'cin': 'U12345MH2015PTC123456',
    'incorporation_year': 2015,
    'promoters': ['Mr. Rajesh Kumar']
}

data_sources = {
    'gst': 'data/gst_returns.json',
    'bank_statement': 'data/bank_statement.csv',
    'financial_statements': 'data/annual_report.pdf'
}

results = engine.process_credit_application(
    company_info=company_info,
    data_sources=data_sources
)

print(f"Decision: {results['recommendation']['decision']}")
print(f"Score: {results['recommendation']['credit_score']}")
```

##### quick_score()

Calculate credit score without full CAM generation.

```python
score = engine.quick_score(
    company_info: Dict[str, Any],
    data_sources: Dict[str, Any]
) -> int
```

**Returns:** Credit score (0-1000)

---

### 2. DataIngestor

Handles multi-format data ingestion.

#### Constructor

```python
from data_ingestor.ingestor import DataIngestor

ingestor = DataIngestor()
```

#### Methods

##### ingest_pdf()

Extract text and tables from PDF.

```python
data = ingestor.ingest_pdf(pdf_path: str) -> Dict[str, Any]
```

**Returns:**
```python
{
    'text': str,
    'tables': List[List],
    'num_pages': int,
    'source': str
}
```

##### parse_gst_returns()

Parse GST return data.

```python
gst_data = ingestor.parse_gst_returns(gst_data: Dict) -> Dict[str, Any]
```

**Input:**
```python
{
    'gstin': str,
    'gstr3b': List[Dict],
    'gstr2a': List[Dict]
}
```

**Returns:**
```python
{
    'gstin': str,
    'total_turnover': float,
    'gstr3b_vs_gstr2a_mismatch': bool,
    'mismatch_amount': float
}
```

##### parse_bank_statements()

Parse bank statement file.

```python
bank_data = ingestor.parse_bank_statements(bank_file: str) -> Dict[str, Any]
```

**Returns:**
```python
{
    'total_credits': float,
    'total_debits': float,
    'average_balance': float,
    'circular_trading_detected': bool,
    'bounce_rate': float
}
```

##### parse_financial_statements()

Extract financial metrics from PDF.

```python
financials = ingestor.parse_financial_statements(pdf_path: str) -> Dict[str, Any]
```

**Returns:**
```python
{
    'revenue': float,
    'ebitda': float,
    'net_profit': float,
    'total_debt': float,
    'net_worth': float,
    'debt_to_ebitda': float,
    'debt_to_equity': float
}
```

---

### 3. ResearchAgent

Automated secondary research.

#### Constructor

```python
from research_agent.agent import ResearchAgent

agent = ResearchAgent(api_key: str = None)
```

#### Methods

##### search_company_news()

Search for company news articles.

```python
news = agent.search_company_news(
    company_name: str,
    days_back: int = 180
) -> List[Dict[str, Any]]
```

**Returns:**
```python
[
    {
        'title': str,
        'link': str,
        'pub_date': str,
        'description': str,
        'sentiment': str  # 'POSITIVE', 'NEGATIVE', 'NEUTRAL'
    }
]
```

##### search_promoter_background()

Research promoter backgrounds.

```python
promoter_data = agent.search_promoter_background(
    promoter_names: List[str]
) -> Dict[str, Any]
```

**Returns:**
```python
{
    'promoter_name': {
        'negative_news_count': int,
        'risk_level': str,  # 'LOW', 'MEDIUM', 'HIGH'
        'articles': List[Dict]
    }
}
```

##### check_litigation_history()

Check litigation cases.

```python
litigation = agent.check_litigation_history(
    company_name: str,
    cin: str = None
) -> Dict[str, Any]
```

##### analyze_sector_trends()

Analyze sector trends and regulations.

```python
sector_analysis = agent.analyze_sector_trends(sector: str) -> Dict[str, Any]
```

##### conduct_full_research()

Orchestrate complete research.

```python
research_report = agent.conduct_full_research(
    company_info: Dict[str, Any]
) -> Dict[str, Any]
```

---

### 4. CreditRecommendationEngine

ML-based credit scoring and recommendation.

#### Constructor

```python
from recommendation_engine.engine import CreditRecommendationEngine

engine = CreditRecommendationEngine()
```

#### Methods

##### extract_features()

Extract features from ingested data.

```python
features = engine.extract_features(data: Dict[str, Any]) -> pd.DataFrame
```

##### calculate_credit_score()

Calculate credit score using Five Cs.

```python
scoring = engine.calculate_credit_score(features: pd.DataFrame) -> Dict[str, Any]
```

**Returns:**
```python
{
    'credit_score': int,  # 0-1000
    'character_score': float,  # 0-100
    'capacity_score': float,
    'capital_score': float,
    'collateral_score': float,
    'conditions_score': float,
    'rating': str  # 'AAA' to 'C'
}
```

##### recommend_loan_amount()

Recommend loan amount based on financials.

```python
amount = engine.recommend_loan_amount(
    features: pd.DataFrame,
    credit_score: int
) -> float
```

##### recommend_interest_rate()

Recommend interest rate with risk premium.

```python
rate = engine.recommend_interest_rate(
    credit_score: int,
    base_rate: float = 9.0
) -> float
```

##### make_recommendation()

Generate complete recommendation.

```python
recommendation = engine.make_recommendation(
    all_data: Dict[str, Any]
) -> Dict[str, Any]
```

---

### 5. CAMGenerator

Generate Credit Appraisal Memo documents.

#### Constructor

```python
from cam_generator.generator import CAMGenerator

generator = CAMGenerator(output_dir: str = "./outputs")
```

#### Methods

##### generate_cam()

Generate CAM document.

```python
cam_path = generator.generate_cam(
    company_info: Dict[str, Any],
    data_summary: Dict[str, Any],
    research_summary: Dict[str, Any],
    recommendation: Dict[str, Any],
    primary_insights: Dict[str, Any] = None
) -> str
```

**Returns:** File path to generated CAM document

---

## Complete Example

```python
import sys
sys.path.append('./src')

from main import IntelliCreditEngine
import json

# Initialize
engine = IntelliCreditEngine()

# Company info
company_info = {
    'company_name': 'ABC Manufacturing Pvt Ltd',
    'sector': 'Manufacturing',
    'cin': 'U12345MH2015PTC123456',
    'incorporation_year': 2015,
    'promoters': ['Mr. Rajesh Kumar', 'Mrs. Priya Sharma']
}

# Load GST data
with open('data/sample_data/sample_gst.json', 'r') as f:
    gst_data = json.load(f)

# Data sources
data_sources = {
    'gst': gst_data,
    'bank_statement': 'data/sample_data/sample_bank_statement.csv',
    'mca': {
        'director_changes': 1,
        'charges': [],
        'compliance_status': 'Active',
        'authorized_capital': 100,
        'paid_up_capital': 75
    }
}

# Add manual financial data
data_sources['financials_manual'] = {
    'revenue': 650.5,
    'ebitda': 97.58,
    'net_profit': 52.04,
    'total_debt': 195.12,
    'net_worth': 325.25
}

# Primary insights
primary_insights = {
    'capacity_utilization': 78,
    'management_quality_score': 8,
    'site_visit_score': 8,
    'site_visit_notes': 'Factory well-maintained. Good operations.',
    'management_interview_notes': 'Management competent and transparent.'
}

# Process
results = engine.process_credit_application(
    company_info=company_info,
    data_sources=data_sources,
    primary_insights=primary_insights
)

# Access results
recommendation = results['recommendation']

print(f"Decision: {recommendation['decision']}")
print(f"Credit Score: {recommendation['credit_score']}")
print(f"Rating: {recommendation['rating']}")
print(f"Loan Amount: ₹{recommendation['recommended_loan_amount']:.2f} Cr")
print(f"Interest Rate: {recommendation['recommended_interest_rate']:.2f}%")
print(f"\nCAM Document: {results['cam_document_path']}")

# Risk factors
if recommendation['risk_factors']:
    print("\nRisk Factors:")
    for risk in recommendation['risk_factors']:
        print(f"  - {risk}")

# Strengths
if recommendation['strengths']:
    print("\nStrengths:")
    for strength in recommendation['strengths']:
        print(f"  - {strength}")
```

## Error Handling

All methods may raise exceptions. Wrap in try-except:

```python
try:
    results = engine.process_credit_application(...)
except FileNotFoundError as e:
    print(f"File not found: {e}")
except ValueError as e:
    print(f"Invalid data: {e}")
except Exception as e:
    print(f"Error: {e}")
```

## Best Practices

1. **Validate inputs** before processing
2. **Handle missing data** gracefully
3. **Log all operations** for audit trail
4. **Cache results** for performance
5. **Sanitize file paths** for security

## Performance Tips

1. **Batch processing**: Process multiple applications together
2. **Async operations**: Use async for web scraping
3. **Caching**: Cache research results
4. **Parallel processing**: Use multiprocessing for PDFs

## Security Considerations

1. **Sanitize inputs**: Validate all user inputs
2. **Secure file handling**: Validate file types and sizes
3. **API keys**: Store in environment variables
4. **Data encryption**: Encrypt sensitive data
5. **Access control**: Implement role-based access

## Support

For API questions or issues:
1. Check this documentation
2. Review example code
3. Check error logs
4. Contact development team

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**License:** MIT
