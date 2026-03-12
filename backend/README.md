# Backend - Intelli-Credit AI Engine

## Overview
FastAPI backend with Python AI engine for credit decisioning.

## Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## Run

```bash
python backend_api.py
```

Backend runs on: http://localhost:8000

## API Endpoints

- `POST /analyze` - Process credit application
- `GET /` - Health check

## Structure

```
backend/
├── src/                    # Core AI modules
│   ├── data_ingestor/     # PDF, GST, bank statement parsing
│   ├── research_agent/    # Web scraping & research
│   ├── recommendation_engine/  # ML credit scoring
│   └── cam_generator/     # CAM document generation
├── data/                  # Sample data
├── models/                # ML models
├── outputs/               # Generated CAMs
├── backend_api.py         # FastAPI server
└── requirements.txt       # Python dependencies
```
