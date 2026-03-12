import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('applicationHistory') || '[]');
    setHistory(savedHistory);
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredHistory.map((app, index) => (
              <div 
                key={index}
                className="card"
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => viewDetails(app)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#e2e8f0', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
                      {app.company_name || 'Unknown Company'}
                    </h3>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: '#94a3b8', fontSize: '0.9rem' }}>
                      <span>📊 Score: <strong style={{ color: '#a5b4fc' }}>{app.credit_score}</strong></span>
                      <span>⭐ Rating: <strong style={{ color: '#a5b4fc' }}>{app.rating}</strong></span>
                      <span>💰 Amount: <strong style={{ color: '#a5b4fc' }}>₹{app.recommended_loan_amount?.toFixed(2)} Cr</strong></span>
                      <span>📅 {new Date(app.timestamp || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      fontWeight: '700',
                      background: app.decision === 'APPROVED' 
                        ? 'rgba(16, 185, 129, 0.2)' 
                        : 'rgba(239, 68, 68, 0.2)',
                      border: app.decision === 'APPROVED'
                        ? '1px solid rgba(16, 185, 129, 0.3)'
                        : '1px solid rgba(239, 68, 68, 0.3)',
                      color: app.decision === 'APPROVED' ? '#6ee7b7' : '#fca5a5'
                    }}>
                      {app.decision === 'APPROVED' ? '✅ APPROVED' : '❌ REJECTED'}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '1.5rem' }}>→</div>
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
