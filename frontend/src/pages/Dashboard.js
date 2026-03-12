import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container">
        <div style={{ textAlign: 'center', padding: '5rem 0 3rem' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            background: 'rgba(99, 102, 241, 0.2)',
            borderRadius: '50px',
            marginBottom: '2rem',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            <span style={{ color: '#a5b4fc', fontWeight: '600', fontSize: '0.9rem' }}>✨ AI-Powered Credit Intelligence</span>
          </div>
          
          <h1 className="title" style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            🏦 Intelli-Credit
          </h1>
          <p className="subtitle" style={{ fontSize: '1.4rem', color: '#cbd5e1', maxWidth: '700px', margin: '0 auto 1rem' }}>
            Transform Credit Decisioning with AI
          </p>
          <p style={{ color: '#64748b', marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Analyze weeks of data in minutes. Make smarter lending decisions with explainable AI.
          </p>
          
          <button 
            className="btn" 
            onClick={() => navigate('/new-application')}
            style={{ fontSize: '1.1rem', padding: '1.2rem 3.5rem' }}
          >
            🚀 Start New Application
          </button>
        </div>

        <div className="grid grid-3" style={{ marginTop: '5rem', gap: '2rem' }}>
          <div className="card" style={{ textAlign: 'center', transition: 'all 0.3s ease' }}>
            <div style={{ 
              fontSize: '3.5rem', 
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.5))'
            }}>📄</div>
            <h3 style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '1.3rem', marginBottom: '1rem' }}>Multi-Source Data</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
              Analyze PDFs, GST returns, bank statements, and MCA filings with intelligent parsing
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center', transition: 'all 0.3s ease' }}>
            <div style={{ 
              fontSize: '3.5rem', 
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))'
            }}>🤖</div>
            <h3 style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '1.3rem', marginBottom: '1rem' }}>AI Research Agent</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
              Automated web research, promoter checks, and real-time risk analysis
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center', transition: 'all 0.3s ease' }}>
            <div style={{ 
              fontSize: '3.5rem', 
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))'
            }}>📊</div>
            <h3 style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '1.3rem', marginBottom: '1rem' }}>Smart Decisions</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
              Explainable AI with Five Cs framework and instant credit scoring
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
