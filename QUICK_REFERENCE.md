# Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Setup
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Run Test
python test_engine.py

# Launch Web App
streamlit run app.py

# Run Main Script
python src/main.py
```

## 📁 Project Structure

```
Vivriti Hackathon/
├── src/                          # Source code
│   ├── data_ingestor/           # PDF, GST, Bank parsing
│   ├── research_agent/          # Web scraping, news
│   ├── recommendation_engine/   # ML scoring
│   ├── cam_generator/           # Document generation
│   └── main.py                  # Main orchestrator
├── data/sample_data/            # Sample input files
├── outputs/                     # Generated CAMs
├── app.py                       # Streamlit web UI
├── test_engine.py              # Test script
└── requirements.txt            # Dependencies
```

## 🔑 Key Components

### 1. DataIngestor
```python
from src.data_ingestor.ingestor import DataIngestor

ingestor = DataIngestor()
data = ingestor.ingest_pdf("report.pdf")
gst = ingestor.parse_gst_returns(gst_data)
bank = ingestor.parse_bank_statements("bank.csv")
```

### 2. ResearchAgent
```python
from src.research_agent.agent import ResearchAgent

agent = ResearchAgent()
news = agent.search_company_news("Company Name")
promoters = agent.search_promoter_background(["Name"])
litigation = agent.check_litigation_history("Company")
```

### 3. CreditRecommendationEngine
```python
from src.recommendation_engine.engine import CreditRecommendationEngine

engine = CreditRecommendationEngine()
features = engine.extract_features(all_data)
scoring = engine.calculate_credit_score(features)
recommendation = engine.make_recommendation(all_data)
```

### 4. CAMGenerator
```python
from src.cam_generator.generator import CAMGenerator

generator = CAMGenerator()
cam_path = generator.generate_cam(
    company_info, data_summary, 
    research_summary, recommendation
)
```

## 📊 Data Formats

### Company Info
```python
{
    'company_name': 'ABC Ltd',
    'sector': 'Manufacturing',
    'cin': 'U12345MH2015PTC123456',
    'incorporation_year': 2015,
    'promoters': ['Name1', 'Name2']
}
```

### GST Data
```python
{
    'gstin': '27AABCU9603R1ZM',
    'gstr3b': [{'period': '2023-01', 'total_turnover': 50, ...}],
    'gstr2a': [{'period': '2023-01', 'itc_available': 3.1}]
}
```

### Financial Data
```python
{
    'revenue': 100.0,
    'ebitda': 15.0,
    'net_profit': 8.0,
    'total_debt': 40.0,
    'net_worth': 60.0
}
```

### Primary Insights
```python
{
    'capacity_utilization': 75,
    'management_quality_score': 8,
    'site_visit_score': 7,
    'site_visit_notes': 'Observations...',
    'management_interview_notes': 'Notes...'
}
```

## 🎯 Credit Score Ranges

| Score | Rating | Description |
|-------|--------|-------------|
| 800-1000 | AAA | Excellent |
| 750-799 | AA | Very Good |
| 700-749 | A | Good |
| 650-699 | BBB | Satisfactory |
| 600-649 | BB | Fair |
| 550-599 | B | Poor |
| <550 | C | High Risk |

## 🔍 Five Cs of Credit

1. **Character** (25%)
   - Promoter quality
   - Compliance history
   - GST mismatches
   - Litigation

2. **Capacity** (30%)
   - EBITDA margin
   - Debt/EBITDA ratio
   - Capacity utilization

3. **Capital** (20%)
   - Debt/Equity ratio
   - Net worth
   - Capital structure

4. **Collateral** (10%)
   - Asset backing
   - Security coverage

5. **Conditions** (15%)
   - Sector sentiment
   - Market conditions
   - Revenue consistency

## ⚠️ Risk Flags

### High Priority
- GST mismatch (GSTR-3B vs 2A)
- Circular trading detected
- High promoter risk
- Multiple litigation cases
- Negative news coverage

### Medium Priority
- Director changes
- High leverage (D/E > 2)
- Low capacity utilization
- Payment bounces

### Low Priority
- Minor compliance delays
- Single litigation case
- Moderate leverage

## 💡 Tips & Tricks

### Better Extraction
- Use high-quality PDFs (not scanned if possible)
- Ensure tables are properly formatted
- Provide complete financial statements

### Better Research
- Provide accurate company names
- Include all promoter names
- Specify correct sector

### Better Scoring
- Include primary insights (site visit)
- Provide complete financial data
- Cross-verify GST with bank statements

### Better CAM
- Add detailed site visit notes
- Include management interview feedback
- Provide context for anomalies

## 🐛 Common Issues

### Issue: Import errors
```bash
# Solution
pip install -r requirements.txt --upgrade
```

### Issue: PDF not parsing
```bash
# Solution: Check PDF format
# Try converting to text-based PDF
```

### Issue: Web scraping blocked
```python
# Solution: Add delays
import time
time.sleep(2)
```

### Issue: Streamlit not loading
```bash
# Solution: Clear cache
streamlit cache clear
```

## 📞 Support

1. Check README.md
2. Review SETUP.md
3. Run test_engine.py
4. Check error logs
5. Review sample data

## 🎓 Learning Resources

### Understanding Credit Analysis
- Five Cs of Credit
- Financial ratio analysis
- Credit scoring models

### Indian Context
- GST return filing
- MCA compliance
- e-Courts system
- CIBIL reports

### Technical Skills
- Python programming
- Machine learning basics
- Web scraping
- Document processing

## 🏆 Hackathon Tips

### Presentation
1. Start with problem statement
2. Demo the solution live
3. Show CAM document
4. Explain explainability
5. Highlight Indian context

### Demo Scenarios
1. Strong applicant → Approved
2. Risky applicant → Rejected
3. Borderline case → Conditional

### Key Points to Emphasize
- End-to-end solution
- Explainable AI
- Indian context sensitivity
- Production-ready code
- Real impact

## 📚 Additional Resources

- README.md - Full documentation
- SETUP.md - Installation guide
- PRESENTATION.md - Pitch deck
- test_engine.py - Working example
- app.py - Interactive demo

---

**Quick Help:**
- Installation: See SETUP.md
- Usage: See README.md
- Demo: Run `streamlit run app.py`
- Test: Run `python test_engine.py`

Good luck! 🚀
