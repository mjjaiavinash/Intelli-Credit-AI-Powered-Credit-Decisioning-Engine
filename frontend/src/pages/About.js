import React from 'react';
import Navbar from '../components/Navbar';

function About() {
  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container">
        <div className="card" style={{ maxWidth: '900px', margin: '2rem auto' }}>
          <h1 className="title" style={{ fontSize: '2.5rem' }}>About Intelli-Credit</h1>

          <div style={{ color: '#cbd5e1', lineHeight: '1.8' }}>
            <h2 style={{ color: '#a5b4fc', marginTop: '2rem', fontWeight: '700' }}>Overview</h2>
            <p style={{ color: '#94a3b8' }}>
              Intelli-Credit is an AI-powered credit decisioning engine designed for corporate lending in India.
            </p>

            <h2 style={{ color: '#a5b4fc', marginTop: '2rem', fontWeight: '700' }}>Key Features</h2>
            
            <h3 style={{ color: '#c4b5fd', marginTop: '1.5rem', fontWeight: '600' }}>1. Multi-Source Data Ingestion</h3>
            <ul style={{ color: '#94a3b8' }}>
              <li>PDF parsing for annual reports and financial statements</li>
              <li>GST returns analysis (GSTR-3B vs GSTR-2A reconciliation)</li>
              <li>Bank statement analysis with circular trading detection</li>
              <li>MCA filings integration</li>
            </ul>

            <h3 style={{ color: '#c4b5fd', marginTop: '1.5rem', fontWeight: '600' }}>2. Automated Research Agent</h3>
            <ul style={{ color: '#94a3b8' }}>
              <li>Web scraping for company news</li>
              <li>Promoter background checks</li>
              <li>Litigation history from e-Courts</li>
              <li>Sector trend analysis</li>
            </ul>

            <h3 style={{ color: '#c4b5fd', marginTop: '1.5rem', fontWeight: '600' }}>3. ML-Based Recommendation Engine</h3>
            <ul style={{ color: '#94a3b8' }}>
              <li>Five Cs of Credit analysis</li>
              <li>Credit score calculation (0-1000 scale)</li>
              <li>Loan amount recommendation</li>
              <li>Explainable AI with detailed reasoning</li>
            </ul>

            <h2 style={{ color: '#a5b4fc', marginTop: '2rem', fontWeight: '700' }}>Technology Stack</h2>
            <ul style={{ color: '#94a3b8' }}>
              <li><strong style={{ color: '#e2e8f0' }}>Frontend:</strong> React.js, Modern CSS</li>
              <li><strong style={{ color: '#e2e8f0' }}>Backend:</strong> Python, FastAPI</li>
              <li><strong style={{ color: '#e2e8f0' }}>ML/AI:</strong> scikit-learn, XGBoost</li>
              <li><strong style={{ color: '#e2e8f0' }}>Document Processing:</strong> PyPDF2, pdfplumber</li>
              <li><strong style={{ color: '#e2e8f0' }}>Web Scraping:</strong> BeautifulSoup</li>
            </ul>

            <h2 style={{ color: '#a5b4fc', marginTop: '2rem', fontWeight: '700' }}>Developed For</h2>
            <p style={{ color: '#94a3b8' }}>
              <strong style={{ color: '#e2e8f0' }}>IIT Hyderabad AI & ML Hackathon</strong><br />
              Theme: Next-Gen Corporate Credit Appraisal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
