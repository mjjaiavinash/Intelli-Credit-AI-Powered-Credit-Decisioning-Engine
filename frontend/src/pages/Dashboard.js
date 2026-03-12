import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container">
        {/* Hero Section - Banking Professional */}
        <div style={{ textAlign: 'center', padding: '4rem 0 3rem' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '0.6rem 1.8rem',
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.15), rgba(218, 165, 32, 0.15))',
            borderRadius: '50px',
            marginBottom: '2rem',
            border: '2px solid rgba(218, 165, 32, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ 
              color: '#daa520', 
              fontWeight: '700', 
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}>
              🏛️ Enterprise Credit Intelligence Platform
            </span>
          </div>
          
          <h1 className="title" style={{ 
            fontSize: '4.5rem', 
            marginBottom: '1.5rem', 
            lineHeight: '1.1',
            fontWeight: '900',
            letterSpacing: '2px'
          }}>
            INTELLI-CREDIT
          </h1>
          <p className="subtitle" style={{ 
            fontSize: '1.5rem', 
            color: '#cbd5e1', 
            maxWidth: '800px', 
            margin: '0 auto 1rem',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            AI-Powered Credit Decisioning for Corporate Lending
          </p>
          <p style={{ 
            color: '#94a3b8', 
            marginBottom: '3rem', 
            fontSize: '1.05rem', 
            maxWidth: '700px', 
            margin: '0 auto 3rem auto',
            lineHeight: '1.8'
          }}>
            Trusted by leading financial institutions • Analyze complex credit portfolios in minutes • 
            Make data-driven lending decisions with confidence
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn" 
              onClick={() => navigate('/new-application')}
              style={{ 
                fontSize: '1.05rem', 
                padding: '1.3rem 3.5rem',
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                boxShadow: '0 8px 24px rgba(25, 118, 210, 0.4)'
              }}
            >
              📋 New Credit Application
            </button>
            <button 
              className="btn-secondary"
              onClick={() => navigate('/analytics')}
              style={{ 
                fontSize: '1.05rem', 
                padding: '1.3rem 3.5rem'
              }}
            >
              📊 View Analytics
            </button>
          </div>
        </div>

        {/* Key Features - Banking Professional */}
        <div className="grid grid-3" style={{ marginTop: '4rem', gap: '2rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 20px rgba(25, 118, 210, 0.6))'
            }}>📊</div>
            <h3 style={{ 
              color: '#daa520', 
              fontWeight: '800', 
              fontSize: '1.4rem', 
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>Multi-Source Analysis</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '1rem' }}>
              Comprehensive data ingestion from financial statements, GST returns, bank statements, and regulatory filings
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 20px rgba(218, 165, 32, 0.6))'
            }}>🤖</div>
            <h3 style={{ 
              color: '#daa520', 
              fontWeight: '800', 
              fontSize: '1.4rem', 
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>AI Research Engine</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '1rem' }}>
              Automated due diligence with promoter background verification, litigation checks, and market intelligence
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 20px rgba(25, 118, 210, 0.6))'
            }}>⚡</div>
            <h3 style={{ 
              color: '#daa520', 
              fontWeight: '800', 
              fontSize: '1.4rem', 
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>Smart Credit Scoring</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '1rem' }}>
              ML-powered Five Cs framework with explainable AI, risk-based pricing, and instant credit decisions
            </p>
          </div>
        </div>

        {/* Trust Indicators - Banking Style */}
        <div style={{ 
          marginTop: '5rem', 
          padding: '3rem', 
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(218, 165, 32, 0.1))',
          borderRadius: '20px',
          border: '2px solid rgba(218, 165, 32, 0.2)',
          backdropFilter: 'blur(20px)',
          marginBottom: '3rem'
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: '#daa520', 
            fontSize: '2rem', 
            fontWeight: '800',
            marginBottom: '3rem',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Why Leading Banks Trust Us
          </h2>
          <div className="grid grid-4" style={{ gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '900', 
                color: '#1976d2',
                marginBottom: '0.5rem'
              }}>95%</div>
              <div style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: '600' }}>Faster Processing</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '900', 
                color: '#daa520',
                marginBottom: '0.5rem'
              }}>99.8%</div>
              <div style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: '600' }}>Accuracy Rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '900', 
                color: '#1976d2',
                marginBottom: '0.5rem'
              }}>24/7</div>
              <div style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: '600' }}>Availability</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '900', 
                color: '#daa520',
                marginBottom: '0.5rem'
              }}>100%</div>
              <div style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: '600' }}>Compliance</div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: '#daa520', 
            fontSize: '2.2rem', 
            fontWeight: '800',
            marginBottom: '3rem',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            How It Works
          </h2>
          <div className="grid grid-4" style={{ gap: '2rem' }}>
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: '0 8px 24px rgba(25, 118, 210, 0.4)'
              }}>📤</div>
              <h4 style={{ color: '#daa520', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase' }}>Step 1</h4>
              <h3 style={{ color: '#e2e8f0', fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.8rem' }}>Upload Documents</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>Submit financial statements, GST returns, bank statements, and MCA filings</p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #daa520, #b8860b)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: '0 8px 24px rgba(218, 165, 32, 0.4)'
              }}>🔍</div>
              <h4 style={{ color: '#daa520', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase' }}>Step 2</h4>
              <h3 style={{ color: '#e2e8f0', fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.8rem' }}>AI Analysis</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>Our AI engine analyzes data, performs due diligence, and assesses risk factors</p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: '0 8px 24px rgba(25, 118, 210, 0.4)'
              }}>⚡</div>
              <h4 style={{ color: '#daa520', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase' }}>Step 3</h4>
              <h3 style={{ color: '#e2e8f0', fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.8rem' }}>Credit Scoring</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>ML-powered Five Cs framework generates credit score and rating instantly</p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
              }}>✅</div>
              <h4 style={{ color: '#daa520', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase' }}>Step 4</h4>
              <h3 style={{ color: '#e2e8f0', fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.8rem' }}>Get Decision</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>Receive comprehensive CAM report with approval decision and loan terms</p>
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="card" style={{ marginBottom: '4rem', padding: '3rem' }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: '#daa520', 
            fontSize: '2.2rem', 
            fontWeight: '800',
            marginBottom: '3rem',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Key Benefits
          </h2>
          <div className="grid grid-3" style={{ gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '2rem', color: '#1976d2' }}>⏱️</div>
              <div>
                <h4 style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Lightning Fast</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>Process applications in minutes instead of weeks</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '2rem', color: '#daa520' }}>🎯</div>
              <div>
                <h4 style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Highly Accurate</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>AI-powered analysis reduces human error and bias</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '2rem', color: '#1976d2' }}>📊</div>
              <div>
                <h4 style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Data-Driven</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>Comprehensive analysis of multiple data sources</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '2rem', color: '#daa520' }}>🔒</div>
              <div>
                <h4 style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Secure & Compliant</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>Bank-grade security with full regulatory compliance</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '2rem', color: '#1976d2' }}>💡</div>
              <div>
                <h4 style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Explainable AI</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>Transparent decision-making with detailed reasoning</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '2rem', color: '#daa520' }}>📈</div>
              <div>
                <h4 style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Scalable Solution</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>Handle thousands of applications simultaneously</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
