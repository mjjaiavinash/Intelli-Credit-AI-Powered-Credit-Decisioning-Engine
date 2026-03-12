# 🏦 Intelli-Credit: AI-Powered Credit Decisioning Engine

## 🎯 Overview

**Intelli-Credit** is an end-to-end AI-powered credit appraisal system for corporate lending in the Indian market. Built for the IIT Hyderabad AI & ML Hackathon.

## 🏗️ Project Structure

```
Vivriti Hackathon/
├── backend/                    # Python AI Engine + FastAPI
│   ├── src/                   # Core AI modules
│   │   ├── data_ingestor/    # PDF, GST, bank parsing
│   │   ├── research_agent/   # Web scraping
│   │   ├── recommendation_engine/  # ML scoring
│   │   └── cam_generator/    # CAM generation
│   ├── data/                 # Sample data
│   ├── outputs/              # Generated CAMs
│   ├── backend_api.py        # FastAPI server
│   └── requirements.txt      # Python dependencies
│
├── frontend/                  # React.js UI
│   ├── src/
│   │   ├── components/       # Navbar
│   │   ├── pages/           # Dashboard, NewApplication, Results
│   │   └── services/        # API client
│   └── package.json         # Node dependencies
│
└── README.md                 # This file
```

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python backend_api.py
```

Backend runs on: **http://localhost:8000**

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: **http://localhost:3000**

## 🌟 Key Features

### 1. Multi-Source Data Ingestion
- PDF parsing (annual reports, rating reports)
- GST reconciliation (GSTR-3B vs GSTR-2A)
- Bank statement analysis with circular trading detection
- MCA filings parsing

### 2. Intelligent Research Agent
- Automated news monitoring
- Promoter background checks
- Litigation history
- Sector analysis

### 3. ML-Based Recommendation Engine
- Five Cs Framework (Character, Capacity, Capital, Collateral, Conditions)
- Credit scoring (0-1000 scale, AAA to C ratings)
- Risk-based pricing
- Explainable AI

### 4. Professional CAM Generation
- Automated Word document generation
- Comprehensive analysis reports

## 🛠️ Technology Stack

### Backend
- **FastAPI** - REST API
- **scikit-learn, XGBoost** - ML models
- **PyPDF2, pdfplumber** - Document processing
- **BeautifulSoup** - Web scraping
- **python-docx** - CAM generation

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Animations & styling

## 📊 Credit Scoring

**Score Ranges:**
- 800-1000: AAA (Excellent)
- 750-799: AA (Very Good)
- 700-749: A (Good)
- 650-699: BBB (Satisfactory)
- 600-649: BB (Fair)
- 550-599: B (Poor)
- <550: C (High Risk)

**Decision:** Score >600 = APPROVED, <600 = REJECTED

## 🎯 API Endpoints

- `POST /analyze` - Process credit application
- `GET /health` - Health check

## 📁 Sample Data

Located in `backend/data/sample_data/`:
- `sample_gst.json` - GST returns
- `sample_bank_statement.csv` - Bank transactions
- `sample_mca.json` - MCA filings

## 🧪 Testing

Run backend test:
```bash
cd backend
python test_engine.py
```

## 👥 Team

Developed for IIT Hyderabad AI & ML Hackathon

## 📄 License

MIT License

---

**Built with ❤️ for the Indian lending ecosystem**
