# Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### Issue 1: pip install fails
```
ERROR: Could not find a version that satisfies the requirement...
```

**Solution:**
```bash
# Update pip first
python -m pip install --upgrade pip

# Try installing again
pip install -r requirements.txt

# If specific package fails, install individually
pip install pandas numpy scikit-learn
pip install streamlit fastapi
pip install pdfplumber PyPDF2 python-docx
```

#### Issue 2: Virtual environment not activating
```
'venv' is not recognized as an internal or external command
```

**Solution:**
```bash
# Windows
python -m venv venv
venv\Scripts\activate.bat

# If PowerShell
venv\Scripts\Activate.ps1

# If execution policy error
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Issue 3: Python version incompatibility
```
ERROR: Package requires Python >=3.8
```

**Solution:**
```bash
# Check Python version
python --version

# If < 3.8, download Python 3.9 or 3.10 from python.org
# Then create venv with specific version
py -3.9 -m venv venv
```

---

### Runtime Issues

#### Issue 4: Module not found
```
ModuleNotFoundError: No module named 'src'
```

**Solution:**
```python
# Add to top of script
import sys
sys.path.append('./src')

# Or run from project root
cd "c:\Users\HS\Downloads\Vivriti Hackathon"
python test_engine.py
```

#### Issue 5: File not found
```
FileNotFoundError: [Errno 2] No such file or directory: 'data/sample_data/sample_gst.json'
```

**Solution:**
```bash
# Check current directory
cd

# Navigate to project root
cd "c:\Users\HS\Downloads\Vivriti Hackathon"

# Verify file exists
dir data\sample_data\

# Run script from project root
python test_engine.py
```

#### Issue 6: Permission denied
```
PermissionError: [Errno 13] Permission denied: 'outputs/CAM_...'
```

**Solution:**
```bash
# Close any open Word documents
# Check if outputs folder exists
mkdir outputs

# Check folder permissions
# Run as administrator if needed
```

---

### PDF Processing Issues

#### Issue 7: PDF parsing fails
```
Error processing PDF: ...
```

**Solution:**
```python
# Check PDF file
# - Is it corrupted?
# - Is it password-protected?
# - Is it a scanned image?

# For scanned PDFs, install Tesseract OCR
# Download from: https://github.com/UB-Mannheim/tesseract/wiki
# Add to PATH

# Try alternative parser
import PyPDF2
# or
import pdfplumber
```

#### Issue 8: Table extraction returns empty
```
tables: []
```

**Solution:**
```python
# PDF might not have proper table structure
# Try manual extraction or different tool

# Check if PDF has selectable text
# If not, use OCR first

# Alternative: Use Camelot or Tabula
pip install camelot-py
```

---

### Web Scraping Issues

#### Issue 9: Web scraping blocked
```
403 Forbidden or 429 Too Many Requests
```

**Solution:**
```python
# Add delays between requests
import time
time.sleep(2)

# Rotate user agents
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

# Use proxies (if needed)
proxies = {
    'http': 'http://proxy:port',
    'https': 'https://proxy:port'
}

# For production, use proper APIs instead of scraping
```

#### Issue 10: No search results
```
news_analysis: []
```

**Solution:**
```python
# Check internet connection
# Verify company name is correct
# Try different search terms
# Check if search engine is accessible

# For demo, use mock data
mock_news = [
    {'title': 'Company expands operations', 'sentiment': 'POSITIVE'}
]
```

---

### Streamlit Issues

#### Issue 11: Streamlit won't start
```
streamlit: command not found
```

**Solution:**
```bash
# Ensure streamlit is installed
pip install streamlit

# Check if in PATH
where streamlit

# Run with python -m
python -m streamlit run app.py

# Specify port if 8501 is busy
streamlit run app.py --server.port 8502
```

#### Issue 12: Streamlit page blank
```
Browser shows blank page
```

**Solution:**
```bash
# Clear Streamlit cache
streamlit cache clear

# Check browser console for errors (F12)

# Try different browser

# Check if firewall is blocking

# Restart Streamlit
Ctrl+C
streamlit run app.py
```

#### Issue 13: File upload fails
```
Error uploading file
```

**Solution:**
```python
# Check file size (Streamlit has 200MB default limit)
# Increase in .streamlit/config.toml:
[server]
maxUploadSize = 500

# Check file format
# Ensure file is not corrupted
```

---

### Data Issues

#### Issue 14: GST mismatch always false
```
gstr3b_vs_gstr2a_mismatch: False
```

**Solution:**
```python
# Check data format
# Ensure both GSTR-3B and GSTR-2A data present
# Verify ITC amounts are in same units

# Debug calculation
print(f"GSTR-2A ITC: {gstr2a_itc}")
print(f"GSTR-3B ITC: {gstr3b_itc}")
print(f"Difference: {abs(gstr2a_itc - gstr3b_itc)}")
```

#### Issue 15: Credit score always same
```
credit_score: 500 (for all applications)
```

**Solution:**
```python
# Check if features are being extracted correctly
features = engine.extract_features(data)
print(features)

# Verify data has variation
# Check if default values are being used

# Debug scoring
scoring = engine.calculate_credit_score(features)
print(scoring)
```

#### Issue 16: Bank statement parsing fails
```
Error parsing bank statement
```

**Solution:**
```python
# Check CSV format
# Required columns: date, description, amount, balance

# Check for:
# - Correct delimiter (comma vs semicolon)
# - Header row present
# - Date format consistent
# - Amount format (no currency symbols)

# Example correct format:
# date,description,amount,balance
# 2023-01-01,Opening Balance,0,100000
```

---

### CAM Generation Issues

#### Issue 17: CAM document not generated
```
Error generating CAM
```

**Solution:**
```python
# Check if outputs folder exists
import os
os.makedirs('outputs', exist_ok=True)

# Check if python-docx is installed
pip install python-docx

# Verify data is complete
print(company_info)
print(recommendation)

# Check for special characters in company name
company_name = company_name.replace('/', '_')
```

#### Issue 18: CAM document corrupted
```
Word cannot open document
```

**Solution:**
```python
# Ensure document is fully written before opening
doc.save(filepath)
time.sleep(1)  # Wait for file system

# Check disk space
# Check file permissions

# Try opening with different program
# LibreOffice, Google Docs, etc.
```

---

### Performance Issues

#### Issue 19: Processing too slow
```
Takes > 10 minutes per application
```

**Solution:**
```python
# Disable web research for testing
# Skip research step temporarily

# Reduce news search results
max_results = 5  # instead of 20

# Use caching
import functools
@functools.lru_cache(maxsize=100)
def cached_function():
    pass

# Process in parallel
from multiprocessing import Pool
```

#### Issue 20: Memory error
```
MemoryError: Unable to allocate...
```

**Solution:**
```python
# Process large PDFs in chunks
# Reduce batch size
# Close files after processing

# Increase Python memory limit
import sys
sys.setrecursionlimit(10000)

# Use generators instead of lists
# Clear variables after use
del large_dataframe
```

---

### Demo Issues

#### Issue 21: Demo crashes during presentation
```
Unexpected error during live demo
```

**Solution:**
```bash
# ALWAYS have backup plan:

# 1. Screenshots of working demo
# 2. Pre-recorded video
# 3. Pre-generated results
# 4. Offline mode (mock data)

# Test demo multiple times before presentation
# Have sample data ready
# Know how to restart quickly
```

#### Issue 22: Internet not available
```
Cannot connect to web for research
```

**Solution:**
```python
# Use offline mode
# Pre-load research results

# Mock research data
mock_research = {
    'news_analysis': [...],
    'promoter_analysis': {...},
    'litigation': {...}
}

# Skip web scraping
# Focus on data ingestion and scoring
```

---

### Debugging Tips

#### General Debugging Strategy

1. **Read the error message carefully**
   ```python
   try:
       # code
   except Exception as e:
       print(f"Error: {e}")
       import traceback
       traceback.print_exc()
   ```

2. **Add logging**
   ```python
   from loguru import logger
   logger.info("Processing started")
   logger.debug(f"Data: {data}")
   logger.error(f"Error: {e}")
   ```

3. **Print intermediate results**
   ```python
   print(f"Step 1: {result1}")
   print(f"Step 2: {result2}")
   ```

4. **Test components individually**
   ```python
   # Test data ingestor alone
   ingestor = DataIngestor()
   result = ingestor.ingest_pdf("test.pdf")
   print(result)
   ```

5. **Use debugger**
   ```python
   import pdb
   pdb.set_trace()  # Breakpoint
   ```

---

### Getting Help

#### If issue persists:

1. **Check documentation**
   - README.md
   - API_DOCUMENTATION.md
   - QUICK_REFERENCE.md

2. **Review sample code**
   - test_engine.py
   - app.py

3. **Check logs**
   - Console output
   - Error messages
   - Stack traces

4. **Simplify**
   - Test with minimal data
   - Remove optional features
   - Use mock data

5. **Search online**
   - Stack Overflow
   - GitHub issues
   - Library documentation

---

### Emergency Fixes

#### Quick fixes for demo day:

```python
# 1. Skip failing components
try:
    research = agent.conduct_research(...)
except:
    research = {}  # Use empty research

# 2. Use mock data
if not data_loaded:
    data = load_mock_data()

# 3. Reduce complexity
# Comment out optional features
# Focus on core functionality

# 4. Have pre-generated results
# Load from JSON instead of processing
with open('pre_generated_results.json') as f:
    results = json.load(f)
```

---

### Prevention

#### Best practices to avoid issues:

1. **Test early and often**
   ```bash
   python test_engine.py
   ```

2. **Use version control**
   ```bash
   git init
   git add .
   git commit -m "Working version"
   ```

3. **Document changes**
   - Keep notes of what works
   - Track configuration changes

4. **Have backups**
   - Multiple copies of code
   - Pre-generated results
   - Screenshots/videos

5. **Practice demo**
   - Run through multiple times
   - Test on different machines
   - Have contingency plans

---

### Contact & Support

If you encounter an issue not covered here:

1. Check error message carefully
2. Review relevant documentation
3. Test with sample data
4. Simplify to isolate issue
5. Document the problem clearly

**Remember:** Most issues have simple solutions. Stay calm, debug systematically, and you'll get it working!

---

**Good luck! 🚀**
