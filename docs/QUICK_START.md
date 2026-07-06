# 🚀 Quick Start Guide

## Project Structure

```
Vivriti Hackathon/
├── backend/     # Python AI Engine (FastAPI)
└── frontend/    # React UI
```

## Step 1: Start Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python backend_api.py
```

✅ Backend running on: http://localhost:8000

## Step 2: Start Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

✅ Frontend running on: http://localhost:3000

## Step 3: Use the Application

1. Open browser to http://localhost:3000
2. Click "New Application"
3. Fill in company details
4. Submit for analysis
5. View results with credit score and decision

## Testing Backend Only

```bash
cd backend
python test_engine.py
```

## API Documentation

Visit: http://localhost:8000/docs (when backend is running)

## Troubleshooting

**Backend issues:**
- Ensure Python 3.8+ installed
- Check all dependencies installed: `pip list`

**Frontend issues:**
- Ensure Node.js installed
- Delete `node_modules` and run `npm install` again
- Check backend is running on port 8000

## Sample Data

Located in `backend/data/sample_data/`
