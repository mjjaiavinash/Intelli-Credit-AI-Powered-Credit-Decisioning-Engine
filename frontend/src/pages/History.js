import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { initializeDefaultData } from '../utils/defaultData';

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initialize default data if empty
    initializeDefaultData();
    
    const savedHistory = JSON.parse(localStorage.getItem('applicationHistory') || '[]');
    // Sort by timestamp to mix approved and rejected
    const sortedHistory = savedHistory.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    setHistory(sortedHistory);
  }, []);

  const filteredHistory = history.filter(app => {
    const matchesFilter = filter === 'all' || app.decision === filter;
    const matchesSearch = app.company_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const viewDetails = (app) => {
    localStorage.setItem('results', JSON.stringify(app));
    navigate('/results');
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem('applicationHistory');
      setHistory([]);
    }
  };

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container">
        <div style={{ margin: '2rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="title" style={{ fontSize: '2.5rem', textAlign: 'left' }}>
                📜 Application History
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                View and manage all credit applications
              </p>
            </div>
            {history.length > 0 && (
              <button 
                onClick={clearHistory}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  color: '#fca5a5',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                🗑️ Clear History
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="🔍 Search by company name..."
              className="input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, minWidth: '250px' }}
            />
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'btn' : 'btn-secondary'}
                style={{ padding: '0.75rem 1.5rem' }}
              >
                All ({history.length})
              </button>
              <button
                onClick={() => setFilter('APPROVED')}
                className={filter === 'APPROVED' ? 'btn' : 'btn-secondary'}
                style={{ padding: '0.75rem 1.5rem' }}
              >
                ✅ Approved ({history.filter(a => a.decision === 'APPROVED').length})
              </button>
              <button
                onClick={() => setFilter('REJECTED')}
                className={filter === 'REJECTED' ? 'btn' : 'btn-secondary'}
                style={{ padding: '0.75rem 1.5rem' }}
              >
                ❌ Rejected ({history.filter(a => a.decision === 'REJECTED').length})
              </button>
            </div>
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>No Applications Found</h3>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
              {history.length === 0 
                ? 'Start by creating your first credit application'
                : 'No applications match your search criteria'}
            </p>
            <button 
              className="btn"
              onClick={() => navigate('/new-application')}
            >
              ➕ New Application
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredHistory.map((app, index) => (
              <div 
                key={index}
                className="card"
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '2px solid rgba(218, 165, 32, 0.2)'
                }}
                onClick={() => viewDetails(app)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <h3 style={{ 
                        color: '#daa520', 
                        marginBottom: '0', 
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {app.company_name || 'Unknown Company'}
                      </h3>
                    </div>
                    
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem',
                      marginTop: '1.5rem'
                    }}>
                      <div style={{
                        padding: '1rem',
                        background: 'rgba(25, 118, 210, 0.1)',
                        borderRadius: '10px',
                        border: '1px solid rgba(25, 118, 210, 0.3)'
                      }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Credit Score</div>
                        <div style={{ color: '#64b5f6', fontSize: '1.8rem', fontWeight: '900' }}>{app.credit_score}</div>
                      </div>
                      
                      <div style={{
                        padding: '1rem',
                        background: 'rgba(218, 165, 32, 0.1)',
                        borderRadius: '10px',
                        border: '1px solid rgba(218, 165, 32, 0.3)'
                      }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rating</div>
                        <div style={{ color: '#daa520', fontSize: '1.8rem', fontWeight: '900' }}>{app.rating}</div>
                      </div>
                      
                      <div style={{
                        padding: '1rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '10px',
                        border: '1px solid rgba(16, 185, 129, 0.3)'
                      }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Loan Amount</div>
                        <div style={{ color: '#6ee7b7', fontSize: '1.5rem', fontWeight: '900' }}>₹{app.recommended_loan_amount?.toFixed(2)} Cr</div>
                      </div>
                      
                      <div style={{
                        padding: '1rem',
                        background: 'rgba(148, 163, 184, 0.1)',
                        borderRadius: '10px',
                        border: '1px solid rgba(148, 163, 184, 0.3)'
                      }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</div>
                        <div style={{ color: '#cbd5e1', fontSize: '1rem', fontWeight: '700' }}>{new Date(app.timestamp || Date.now()).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      padding: '1.2rem 2.5rem',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '1.1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      background: app.decision === 'APPROVED' 
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.3))' 
                        : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.3))',
                      border: app.decision === 'APPROVED'
                        ? '2px solid rgba(16, 185, 129, 0.5)'
                        : '2px solid rgba(239, 68, 68, 0.5)',
                      color: app.decision === 'APPROVED' ? '#6ee7b7' : '#fca5a5',
                      boxShadow: app.decision === 'APPROVED'
                        ? '0 4px 16px rgba(16, 185, 129, 0.3)'
                        : '0 4px 16px rgba(239, 68, 68, 0.3)'
                    }}>
                      {app.decision === 'APPROVED' ? '✅ APPROVED' : '❌ REJECTED'}
                    </div>
                    <div style={{ 
                      color: '#64748b', 
                      fontSize: '2rem',
                      fontWeight: '700'
                    }}>→</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
