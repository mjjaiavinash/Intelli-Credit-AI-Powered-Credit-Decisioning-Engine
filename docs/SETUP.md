# Setup Guide for Intelli-Credit Engine

## Quick Start (5 Minutes)

### Step 1: Install Python Dependencies

```bash
# Navigate to project directory
cd "c:\Users\HS\Downloads\Vivriti Hackathon"

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Run the Test

```bash
python test_engine.py
```

This will:
- Process a sample credit application
- Generate a CAM document in the `outputs/` folder
- Display results in the console

### Step 3: Launch Web Interface

```bash
streamlit run app.py
```

Then open your browser to: http://localhost:8501

## Troubleshooting

### Issue: Module not found errors

**Solution:**
```bash
# Make sure you're in the project directory
cd "c:\Users\HS\Downloads\Vivriti Hackathon"

# Reinstall dependencies
pip install -r requirements.txt --upgrade
```

### Issue: PDF parsing errors

**Solution:**
```bash
# Install Tesseract OCR for scanned PDFs (optional)
# Download from: https://github.com/UB-Mannheim/tesseract/wiki
# Add to PATH
```

### Issue: Web scraping blocked

**Solution:**
- The research agent uses public search engines
- Some sites may block automated requests
- Consider adding delays or using API keys for production

### Issue: Streamlit not launching

**Solution:**
```bash
# Check if port 8501 is available
netstat -ano | findstr :8501

# Use different port if needed
streamlit run app.py --server.port 8502
```

## Configuration

### API Keys (Optional)

For enhanced NLP features, add API keys to `.env`:

```bash
# Copy example file
copy .env.example .env

# Edit .env and add your keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

### Custom Thresholds

Edit `.env` to adjust credit scoring thresholds:

```
CREDIT_SCORE_THRESHOLD=650
HIGH_RISK_THRESHOLD=0.7
```

## Data Preparation

### GST Returns Format

Save as JSON:
```json
{
  "gstin": "27AABCU9603R1ZM",
  "gstr3b": [...],
  "gstr2a": [...]
}
```

### Bank Statements Format

Save as CSV:
```csv
date,description,amount,balance
2023-01-01,Opening Balance,0,100000
```

### Financial Statements

- PDF format supported
- Should contain: Revenue, EBITDA, Net Profit, Debt, Net Worth
- Tables will be automatically extracted

## Performance Optimization

### For Large PDFs

```python
# Increase memory limit
import sys
sys.setrecursionlimit(10000)
```

### For Faster Processing

```python
# Disable web research for testing
engine = IntelliCreditEngine()
# Skip research step in data_sources
```

## Production Deployment

### Using Docker (Recommended)

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8501
CMD ["streamlit", "run", "app.py"]
```

Build and run:
```bash
docker build -t intelli-credit .
docker run -p 8501:8501 intelli-credit
```

### Using Cloud Services

**AWS:**
- Deploy on EC2 or ECS
- Use S3 for document storage
- RDS for database

**Azure:**
- Deploy on App Service
- Use Blob Storage for documents
- Azure SQL for database

**GCP:**
- Deploy on Cloud Run
- Use Cloud Storage for documents
- Cloud SQL for database

## Testing

### Unit Tests

```bash
# Run individual module tests
python -m pytest tests/
```

### Integration Tests

```bash
# Run full pipeline test
python test_engine.py
```

### Load Testing

```bash
# Test with multiple applications
python test_load.py
```

## Monitoring

### Logging

Logs are written to console and can be redirected:

```bash
python test_engine.py > logs/output.log 2>&1
```

### Metrics

Track key metrics:
- Processing time per application
- API call counts
- Error rates
- Credit score distribution

## Security

### Best Practices

1. **Never commit API keys** - Use environment variables
2. **Sanitize inputs** - Validate all user inputs
3. **Encrypt sensitive data** - Use encryption for PII
4. **Access control** - Implement role-based access
5. **Audit logs** - Track all credit decisions

### Data Privacy

- Comply with data protection regulations
- Implement data retention policies
- Secure document storage
- Anonymize data for testing

## Support

For issues or questions:
1. Check the README.md
2. Review error logs
3. Check GitHub issues
4. Contact the development team

## Next Steps

1. ✅ Complete setup
2. ✅ Run test script
3. ✅ Launch web interface
4. 📊 Process your first application
5. 📄 Review generated CAM
6. 🚀 Deploy to production

Good luck with the hackathon! 🎉
