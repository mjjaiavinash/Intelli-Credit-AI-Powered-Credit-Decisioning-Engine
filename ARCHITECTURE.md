# System Architecture Diagram

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE LAYER                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────┐              ┌──────────────────────┐    │
│  │   Streamlit Web UI   │              │    Python API        │    │
│  │   (app.py)           │              │    (main.py)         │    │
│  │                      │              │                      │    │
│  │  • File Upload       │              │  • Programmatic      │    │
│  │  • Manual Entry      │              │    Access            │    │
│  │  • Results Display   │              │  • Batch Processing  │    │
│  │  • CAM Download      │              │  • Integration       │    │
│  └──────────────────────┘              └──────────────────────┘    │
│              │                                    │                  │
└──────────────┼────────────────────────────────────┼──────────────────┘
               │                                    │
               └────────────────┬───────────────────┘
                                │
┌───────────────────────────────▼───────────────────────────────────┐
│                      ORCHESTRATION LAYER                           │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                    ┌─────────────────────┐                        │
│                    │  IntelliCreditEngine │                        │
│                    │     (main.py)        │                        │
│                    │                      │                        │
│                    │  • Workflow Control  │                        │
│                    │  • Error Handling    │                        │
│                    │  • Result Aggregation│                        │
│                    └──────────┬───────────┘                        │
│                               │                                     │
└───────────────────────────────┼─────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
                ▼               ▼               ▼
┌───────────────────────────────────────────────────────────────────┐
│                      PROCESSING LAYER                              │
├───────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │    DATA      │  │   RESEARCH   │  │   RECOMMENDATION     │   │
│  │  INGESTOR    │→ │    AGENT     │→ │      ENGINE          │   │
│  │              │  │              │  │                      │   │
│  │ • PDF Parse  │  │ • Web Scrape │  │ • Feature Extract    │   │
│  │ • GST Check  │  │ • News Scan  │  │ • Credit Score       │   │
│  │ • Bank Anal  │  │ • Litigation │  │ • Five Cs Analysis   │   │
│  │ • MCA Parse  │  │ • Sector     │  │ • Loan Recommend     │   │
│  │ • Financial  │  │   Analysis   │  │ • Rate Recommend     │   │
│  │   Extract    │  │ • Promoter   │  │ • Explainability     │   │
│  │              │  │   Check      │  │                      │   │
│  └──────────────┘  └──────────────┘  └──────────┬───────────┘   │
│                                                   │                │
└───────────────────────────────────────────────────┼────────────────┘
                                                    │
                                                    ▼
┌───────────────────────────────────────────────────────────────────┐
│                      OUTPUT LAYER                                  │
├───────────────────────────────────────────────────────────────────┤
│                                                                     │
│                    ┌─────────────────────┐                        │
│                    │   CAM GENERATOR     │                        │
│                    │   (generator.py)    │                        │
│                    │                     │                        │
│                    │  • Word Document    │                        │
│                    │  • Executive Summary│                        │
│                    │  • Five Cs Report   │                        │
│                    │  • Risk Assessment  │                        │
│                    │  • Recommendations  │                        │
│                    └─────────────────────┘                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────┐
│   INPUT     │
│   SOURCES   │
└──────┬──────┘
       │
       ├─── PDF Documents (Annual Reports, Rating Reports)
       ├─── GST Returns (GSTR-3B, GSTR-2A)
       ├─── Bank Statements (CSV, Excel)
       ├─── MCA Filings (JSON)
       └─── Primary Insights (Site Visit Notes)
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│              DATA INGESTION & PARSING                     │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  PDF Parser ──────────► Extract Text & Tables            │
│  GST Parser ──────────► Reconcile 3B vs 2A               │
│  Bank Parser ─────────► Detect Circular Trading          │
│  MCA Parser ──────────► Extract Governance Signals       │
│  Financial Parser ────► Calculate Ratios                 │
│                                                            │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│              SECONDARY RESEARCH                           │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  Web Scraper ─────────► Company News (Sentiment)         │
│  Promoter Check ──────► Background Verification          │
│  Litigation Search ───► e-Courts Portal                  │
│  Sector Analysis ─────► RBI/SEBI Regulations             │
│  Rating Aggregator ───► CRISIL, ICRA, CARE              │
│                                                            │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│              FEATURE ENGINEERING                          │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  Financial Features ──► Revenue, EBITDA, Debt, etc.      │
│  GST Features ────────► Turnover, Mismatch Flag          │
│  Banking Features ────► Balance, Bounce Rate             │
│  Research Features ───► News Sentiment, Litigation       │
│  Primary Features ────► Capacity, Management Quality     │
│  Derived Features ────► Ratios, Consistency Scores       │
│                                                            │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│              CREDIT SCORING (Five Cs)                     │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  Character (25%) ─────► Promoter, Compliance, GST        │
│  Capacity (30%) ──────► EBITDA, Debt/EBITDA, Capacity    │
│  Capital (20%) ───────► Debt/Equity, Net Worth           │
│  Collateral (10%) ────► Asset Backing                    │
│  Conditions (15%) ────► Sector, Market, Consistency      │
│                                                            │
│  ────────────────────► Credit Score (0-1000)             │
│  ────────────────────► Rating (AAA to C)                 │
│                                                            │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│              RECOMMENDATION ENGINE                        │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  Decision Logic ──────► APPROVED / REJECTED              │
│  Amount Calculator ───► Loan Amount (based on EBITDA)    │
│  Rate Calculator ─────► Interest Rate (risk premium)     │
│  Explainer ───────────► Detailed Reasoning               │
│  Risk Identifier ─────► List of Risk Factors             │
│  Strength Identifier ─► List of Strengths                │
│                                                            │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│              CAM GENERATION                               │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  Executive Summary ───► Decision, Score, Amount, Rate     │
│  Company Overview ────► Basic Info, Promoters            │
│  Financial Analysis ──► Tables, Ratios, Trends           │
│  GST & Banking ───────► Analysis, Red Flags              │
│  Research Findings ───► News, Litigation, Sector         │
│  Primary Insights ────► Site Visit, Management           │
│  Risk Assessment ─────► Risks & Strengths                │
│  Terms & Conditions ──► Loan Terms, Covenants            │
│                                                            │
│  ────────────────────► Word Document (.docx)             │
│  ────────────────────► JSON Results                      │
│                                                            │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│              OUTPUT                                       │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  • Credit Appraisal Memo (CAM.docx)                      │
│  • Detailed Results (JSON)                                │
│  • Credit Score & Rating                                  │
│  • Loan Recommendation                                    │
│  • Explainable Decision                                   │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

## Module Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    IntelliCreditEngine                           │
│                         (main.py)                                │
└────────┬────────────────────────────────────────────────────────┘
         │
         │ process_credit_application()
         │
         ├──► 1. Data Ingestion
         │    │
         │    └──► DataIngestor.ingest_all()
         │         │
         │         ├──► ingest_pdf()
         │         ├──► parse_gst_returns()
         │         ├──► parse_bank_statements()
         │         ├──► parse_financial_statements()
         │         └──► parse_mca_filings()
         │
         ├──► 2. Secondary Research
         │    │
         │    └──► ResearchAgent.conduct_full_research()
         │         │
         │         ├──► search_company_news()
         │         ├──► search_promoter_background()
         │         ├──► check_litigation_history()
         │         ├──► analyze_sector_trends()
         │         └──► check_credit_ratings()
         │
         ├──► 3. Credit Recommendation
         │    │
         │    └──► CreditRecommendationEngine.make_recommendation()
         │         │
         │         ├──► extract_features()
         │         ├──► calculate_credit_score()
         │         │    │
         │         │    ├──► _score_character()
         │         │    ├──► _score_capacity()
         │         │    ├──► _score_capital()
         │         │    ├──► _score_collateral()
         │         │    └──► _score_conditions()
         │         │
         │         ├──► recommend_loan_amount()
         │         ├──► recommend_interest_rate()
         │         └──► _generate_explanation()
         │
         └──► 4. CAM Generation
              │
              └──► CAMGenerator.generate_cam()
                   │
                   ├──► _add_executive_summary()
                   ├──► _add_recommendation_section()
                   ├──► _add_five_cs_analysis()
                   ├──► _add_company_overview()
                   ├──► _add_financial_analysis()
                   ├──► _add_gst_banking_analysis()
                   ├──► _add_research_findings()
                   ├──► _add_primary_insights()
                   ├──► _add_risk_assessment()
                   └──► _add_terms_conditions()
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  • Streamlit (Web UI)                                       │
│  • FastAPI (REST API - optional)                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  • Python 3.8+                                              │
│  • Loguru (Logging)                                         │
│  • Pydantic (Data Validation)                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ML/AI LAYER                               │
├─────────────────────────────────────────────────────────────┤
│  • scikit-learn (ML Models)                                 │
│  • XGBoost (Gradient Boosting)                              │
│  • LightGBM (Gradient Boosting)                             │
│  • SHAP (Explainability)                                    │
│  • Transformers (NLP)                                       │
│  • Sentence-Transformers (Embeddings)                       │
│  • LangChain (LLM Orchestration)                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    DOCUMENT PROCESSING LAYER                 │
├─────────────────────────────────────────────────────────────┤
│  • PyPDF2 (PDF Text Extraction)                             │
│  • pdfplumber (PDF Table Extraction)                        │
│  • python-docx (Word Document Generation)                   │
│  • pytesseract (OCR)                                        │
│  • pdf2image (PDF to Image)                                 │
│  • openpyxl (Excel Processing)                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    WEB SCRAPING LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  • BeautifulSoup (HTML Parsing)                             │
│  • Selenium (Dynamic Scraping)                              │
│  • Requests (HTTP Client)                                   │
│  • Scrapy (Web Crawling)                                    │
│  • newspaper3k (Article Extraction)                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    DATA PROCESSING LAYER                     │
├─────────────────────────────────────────────────────────────┤
│  • Pandas (Data Manipulation)                               │
│  • NumPy (Numerical Computing)                              │
│  • JSONSchema (Data Validation)                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    STORAGE LAYER                             │
├─────────────────────────────────────────────────────────────┤
│  • SQLAlchemy (Database ORM)                                │
│  • ChromaDB (Vector Database)                               │
│  • File System (Documents, Models)                          │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION DEPLOYMENT                     │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │  Load        │
                    │  Balancer    │
                    └──────┬───────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
    ┌──────────┐   ┌──────────┐   ┌──────────┐
    │  Web     │   │  Web     │   │  Web     │
    │  Server  │   │  Server  │   │  Server  │
    │  (App)   │   │  (App)   │   │  (App)   │
    └────┬─────┘   └────┬─────┘   └────┬─────┘
         │              │              │
         └──────────────┼──────────────┘
                        │
            ┌───────────┼───────────┐
            │           │           │
            ▼           ▼           ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │  Worker  │ │  Worker  │ │  Worker  │
    │  (ML)    │ │  (ML)    │ │  (ML)    │
    └────┬─────┘ └────┬─────┘ └────┬─────┘
         │            │            │
         └────────────┼────────────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
         ▼            ▼            ▼
    ┌─────────┐  ┌─────────┐  ┌─────────┐
    │Database │  │  Cache  │  │ Storage │
    │(Postgres│  │ (Redis) │  │  (S3)   │
    └─────────┘  └─────────┘  └─────────┘
```

## File Structure with Descriptions

```
Vivriti Hackathon/
│
├── 📄 START_HERE.md              # Entry point - Read this first!
├── 📄 README.md                  # Complete project documentation
├── 📄 SETUP.md                   # Installation and setup guide
├── 📄 PRESENTATION.md            # Hackathon pitch deck
├── 📄 PROJECT_SUMMARY.md         # What has been built
├── 📄 QUICK_REFERENCE.md         # Command cheat sheet
├── 📄 API_DOCUMENTATION.md       # Developer API reference
├── 📄 TROUBLESHOOTING.md         # Common issues & solutions
├── 📄 ARCHITECTURE.md            # This file - System diagrams
│
├── 🐍 app.py                     # Streamlit web interface
├── 🐍 test_engine.py             # Comprehensive test script
├── 📋 requirements.txt           # Python dependencies
├── ⚙️ .env.example               # Environment variables template
├── 🚫 .gitignore                 # Git ignore rules
│
├── 📁 src/                       # Source code
│   │
│   ├── 📁 data_ingestor/        # Data ingestion module
│   │   ├── __init__.py
│   │   └── ingestor.py          # PDF, GST, Bank, MCA parsers
│   │
│   ├── 📁 research_agent/       # Research automation module
│   │   ├── __init__.py
│   │   └── agent.py             # Web scraping, news, litigation
│   │
│   ├── 📁 recommendation_engine/ # ML scoring module
│   │   ├── __init__.py
│   │   └── engine.py            # Credit scoring, Five Cs
│   │
│   ├── 📁 cam_generator/        # Document generation module
│   │   ├── __init__.py
│   │   └── generator.py         # CAM Word document creation
│   │
│   └── 🐍 main.py               # Main orchestrator
│
├── 📁 data/                      # Input data directory
│   └── 📁 sample_data/          # Sample input files
│       ├── sample_gst.json      # Sample GST returns
│       ├── sample_bank_statement.csv  # Sample bank data
│       └── sample_mca.json      # Sample MCA filings
│
├── 📁 outputs/                   # Generated outputs
│   ├── CAM_*.docx               # Generated CAM documents
│   └── *_results.json           # Processing results
│
└── 📁 models/                    # ML models (if trained)
    └── *.pkl                     # Saved model files
```

---

**This architecture supports:**
- ✅ Scalability (horizontal scaling)
- ✅ Modularity (independent components)
- ✅ Maintainability (clean separation)
- ✅ Extensibility (easy to add features)
- ✅ Testability (unit & integration tests)
- ✅ Production-readiness (error handling, logging)

---

*For detailed implementation, see the source code in src/ directory*
