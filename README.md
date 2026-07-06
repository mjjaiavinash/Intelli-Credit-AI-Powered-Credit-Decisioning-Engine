# Intelli-Credit: AI-Powered Credit Decisioning Engine

An end-to-end AI-powered credit appraisal system for corporate lending in the Indian market.
Built for the **IIT Hyderabad AI & ML Hackathon** — Theme: Next-Gen Corporate Credit Appraisal.

---

## Project Structure

```
Vivriti Hackathon/
├── backend/
│   ├── data/
│   │   └── sample_data/              # Sample GST, bank, MCA, financial data
│   ├── models/                       # Saved ML models
│   ├── outputs/                      # Generated CAM documents (.docx + .json)
│   ├── src/
│   │   ├── data_ingestor/
│   │   │   └── ingestor.py           # PDF, GST, bank statement, MCA parsing
│   │   ├── research_agent/
│   │   │   └── agent.py              # Web scraping, news, promoter research
│   │   ├── recommendation_engine/
│   │   │   └── engine.py             # ML scoring, Five Cs framework
│   │   ├── cam_generator/
│   │   │   └── generator.py          # Word document CAM generation
│   │   └── main.py                   # IntelliCreditEngine orchestrator
│   ├── backend_api.py                # FastAPI server
│   ├── requirements_simple.txt       # Core dependencies
│   ├── requirements.txt              # Full dependencies
│   └── test_engine.py                # Backend tests
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js             # Navigation bar
│   │   │   ├── ProtectedRoute.js     # Auth guard
│   │   │   └── ScrollToTop.js        # Scroll utility
│   │   ├── pages/
│   │   │   ├── Login.js              # Login page
│   │   │   ├── SignUp.js             # Registration page
│   │   │   ├── Dashboard.js          # Home / landing
│   │   │   ├── NewApplication.js     # Credit application form
│   │   │   ├── Results.js            # Analysis results
│   │   │   ├── Analytics.js          # Portfolio analytics
│   │   │   ├── History.js            # Application history
│   │   │   ├── Reports.js            # Report generation
│   │   │   ├── Settings.js           # System settings
│   │   │   └── About.js              # About page
│   │   ├── services/
│   │   │   └── api.js                # Axios API client
│   │   └── utils/
│   │       ├── defaultData.js        # Sample application data
│   │       └── clear_storage.js      # Storage utility
│   └── package.json
│
└── docs/                             # All project documentation
```

---

## Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+

### 1. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements_simple.txt
python backend_api.py
```

Backend runs on: **http://localhost:8000**

### 2. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on: **http://localhost:3000**

### Default Login

| Username | Password |
|----------|----------|
| admin | admin123 |

---

## How It Works

```
User submits application (React Frontend)
        |
        v
FastAPI Backend (backend_api.py)
        |
        v
IntelliCreditEngine (src/main.py)
        |
   _____|_____________________________
   |          |           |          |
   v          v           v          v
DataIngestor  ResearchAgent  RecommendationEngine  CAMGenerator
(financials,  (news, promoter, (Five Cs scoring,   (Word .docx
 GST, bank,    litigation,      credit score,        report)
 MCA)          sector trends)   loan amount,
                                interest rate)
        |
        v
Results returned to React UI
```

---

## Key Features

### 1. Multi-Source Data Ingestion (`data_ingestor/ingestor.py`)
- PDF parsing using `pdfplumber` and `PyPDF2` for annual reports and financial statements
- GST returns analysis — GSTR-3B vs GSTR-2A reconciliation and mismatch detection
- Bank statement parsing from CSV/Excel — circular trading detection, bounce rate calculation
- MCA filings parsing — director changes, charge modifications, compliance status
- Manual financial data entry via form

### 2. Automated Research Agent (`research_agent/agent.py`)
- Company news search via Google News RSS
- Promoter background checks using DuckDuckGo web search
- Litigation history check via e-Courts portal
- Sector trend analysis with RBI/SEBI regulatory monitoring
- Credit rating search across CRISIL, ICRA, CARE, India Ratings
- Sentiment analysis on news articles (POSITIVE / NEUTRAL / NEGATIVE)

### 3. ML-Based Recommendation Engine (`recommendation_engine/engine.py`)
- Five Cs of Credit framework with weighted scoring:
  - Character (25%) — promoter risk, compliance, news sentiment
  - Capacity (30%) — EBITDA margin, Debt/EBITDA, capacity utilization
  - Capital (20%) — net worth, debt-to-equity ratio
  - Collateral (10%) — paid-up capital
  - Conditions (15%) — sector sentiment, revenue consistency
- Credit score on 0–1000 scale mapped to AAA–C ratings
- Risk-based interest rate pricing (base rate + risk premium)
- Loan amount recommendation (conservative: min of 2.5x EBITDA, 0.5x revenue, 1.5x net worth)
- Explainable AI — human-readable decision explanation

### 4. CAM Generator (`cam_generator/generator.py`)
- Automated Word document (.docx) generation using `python-docx`
- Sections: Executive Summary, Credit Recommendation, Five Cs Analysis, Financial Analysis, GST & Banking Analysis, Secondary Research Findings, Primary Due Diligence, Risk Assessment, Proposed Terms & Conditions
- Results also saved as JSON alongside the .docx

### 5. React Frontend
- Login / Sign Up with localStorage-based auth
- New Application — supports both file upload mode and manual entry mode
- Results page — credit score, rating, Five Cs breakdown, risk factors, strengths, downloadable report
- Analytics — approval rate, average credit score, rating distribution
- History — searchable and filterable application history
- Reports — generate Summary / Detailed / Analytics reports in .docx or .txt format
- Settings — configurable approval threshold, base interest rate, max loan amount

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status |
| GET | `/health` | Health check |
| GET | `/test` | Test endpoint |
| POST | `/analyze` | Process credit application (JSON) |
| POST | `/analyze-files` | Process credit application (file upload) |

### POST /analyze — Request Body

```json
{
  "company_info": {
    "company_name": "ABC Manufacturing Pvt Ltd",
    "sector": "Manufacturing",
    "incorporation_year": 2015,
    "promoters": ["Rajesh Kumar", "Priya Sharma"]
  },
  "data_sources": {
    "financials_manual": {
      "revenue": 100,
      "ebitda": 15,
      "net_profit": 8,
      "total_debt": 40,
      "net_worth": 60,
      "debt_to_ebitda": 2.67,
      "debt_to_equity": 0.67
    },
    "gst": {
      "total_turnover": 95,
      "gstr3b_vs_gstr2a_mismatch": false,
      "filing_frequency": []
    },
    "bank": {
      "average_balance": 50,
      "total_credits": 1000,
      "total_debits": 900,
      "bounce_rate": 0.01,
      "circular_trading_detected": false
    },
    "mca": {
      "director_changes": 0,
      "compliance_status": "Active",
      "paid_up_capital": 75
    }
  },
  "primary_insights": {
    "capacity_utilization": 75,
    "management_quality_score": 7,
    "site_visit_score": 7,
    "site_visit_notes": "Factory well-maintained",
    "management_interview_notes": "Competent management"
  }
}
```

---

## Credit Scoring

| Score Range | Rating | Assessment |
|-------------|--------|------------|
| 800 – 1000 | AAA | Excellent |
| 750 – 799 | AA | Very Good |
| 700 – 749 | A | Good |
| 650 – 699 | BBB | Satisfactory |
| 600 – 649 | BB | Fair |
| 550 – 599 | B | Poor |
| Below 550 | C | High Risk |

**Decision Rule:** Score >= 600 = APPROVED, Score < 600 = REJECTED

**Interest Rate Pricing:**

| Rating | Risk Premium | Effective Rate (Base 9%) |
|--------|-------------|--------------------------|
| AAA | 0% | 9.00% |
| AA | 0.5% | 9.50% |
| A | 1.0% | 10.00% |
| BBB | 1.5% | 10.50% |
| BB | 2.5% | 11.50% |
| B/C | 4.0% | 13.00% |

---

## Technology Stack

### Backend
| Library | Version | Purpose |
|---------|---------|---------|
| FastAPI | 0.108.0 | REST API framework |
| Uvicorn | 0.25.0 | ASGI server |
| pandas | 2.1.4 | Data processing |
| numpy | 1.26.2 | Numerical computing |
| scikit-learn | 1.3.2 | ML models |
| XGBoost | 2.0.3 | Gradient boosting |
| pdfplumber | 0.10.3 | PDF parsing |
| PyPDF2 | 3.0.1 | PDF reading |
| python-docx | 1.1.0 | CAM document generation |
| BeautifulSoup4 | 4.12.2 | Web scraping |
| requests | 2.31.0 | HTTP client |
| pydantic | 2.5.3 | Data validation |
| loguru | 0.7.2 | Logging |

### Frontend
| Library | Version | Purpose |
|---------|---------|---------|
| React | 18.2.0 | UI framework |
| React Router | 6.20.0 | Client-side routing |
| Axios | 1.6.2 | HTTP client |
| docx | 8.5.0 | Client-side Word generation |
| file-saver | 2.0.5 | File download |

---

## Sample Data

Located in `backend/data/sample_data/`:

| File | Description |
|------|-------------|
| `sample_gst.json` | Sample GST returns (GSTR-3B + GSTR-2A) |
| `sample_bank_statement.csv` | Sample bank transactions |
| `sample_mca.json` | Sample MCA filings |
| `gst_returns.json` | Additional GST sample |
| `bank_statement.csv` | Additional bank sample |
| `financials_statements.csv` | Sample financial statements |
| `mca_filings.json` | Additional MCA sample |

---

## Testing

```bash
cd backend
python test_engine.py
```

---

## Supported Sectors

- Manufacturing
- Services
- Trading
- NBFC
- IT / Software

---

## Developed For

**IIT Hyderabad AI & ML Hackathon**
Theme: Next-Gen Corporate Credit Appraisal for the Indian Lending Ecosystem

---

## License

MIT License
