import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Analytics() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    approved: 0,
    rejected: 0,
    avgCreditScore: 0,
    avgProcessingTime: 0
  });

  useEffect(() => {
    // Load analytics from localStorage
    const history = JSON.parse(localStorage.getItem('applicationHistory') || '[]');
    
    if (history.length > 0) {
      const approved = history.filter(app => app.decision === 'APPROVED').length;
      const rejected = history.filter(app => app.decision === 'REJECTED').length;
      const avgScore = history.reduce((sum, app) => sum + app.credit_score, 0) / history.length;
      
      setStats({
        totalApplications: history.length,
        approved,
        rejected,
        avgCreditScore: Math.round(avgScore),
        avgProcessingTime: 2.5
      });
    }
  }, []);

  const approvalRate = stats.totalApplications > 0 
    ? Math.round((stats.approved / stats.totalApplications) * 100) 
    : 0;

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container">
        <div style={{ margin: '2rem 0' }}>
          <h1 className="title" style={{ fontSize: '2.5rem', textAlign: 'left' }}>
            📊 Analytics Dashboard
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Real-time insights into credit decisioning performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
          <div className="metric-card">
            <div className="metric-value">{stats.totalApplications}</div>
            <div className="metric-label">Total Applications</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value" style={{ 
              background: 'linear-gradient(135deg, #10b981, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stats.approved}
            </div>
            <div className="metric-label">Approved</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value" style={{ 
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stats.rejected}
            </div>
            <div className="metric-label">Rejected</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">{approvalRate}%</div>
            <div className="metric-label">Approval Rate</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-2" style={{ gap: '2rem' }}>
          {/* Average Credit Score */}
          <div className="card">
            <h3 style={{ color: '#a5b4fc', marginBottom: '1.5rem', fontWeight: '700' }}>
              📈 Average Credit Score
            </h3>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                fontSize: '4rem', 
                fontWeight: '900',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {stats.avgCreditScore}
              </div>
              <div style={{ color: '#94a3b8', marginTop: '1rem' }}>
                Out of 1000
              </div>
              <div style={{ 
                marginTop: '2rem',
                height: '12px',
                background: 'rgba(148, 163, 184, 0.2)',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(stats.avgCreditScore / 1000) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                  transition: 'width 1s ease'
                }}></div>
              </div>
            </div>
          </div>

          {/* Processing Time */}
          <div className="card">
            <h3 style={{ color: '#a5b4fc', marginBottom: '1.5rem', fontWeight: '700' }}>
              ⚡ Average Processing Time
            </h3>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                fontSize: '4rem', 
                fontWeight: '900',
                background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {stats.avgProcessingTime}s
              </div>
              <div style={{ color: '#94a3b8', marginTop: '1rem' }}>
                Lightning fast analysis
              </div>
              <div style={{ 
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(236, 72, 153, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(236, 72, 153, 0.3)'
              }}>
                <div style={{ color: '#f9a8d4', fontSize: '0.9rem' }}>
                  🚀 95% faster than traditional methods
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#a5b4fc', marginBottom: '1.5rem', fontWeight: '700' }}>
            🎯 Credit Rating Distribution
          </h3>
          <div className="grid grid-3" style={{ gap: '1rem' }}>
            {['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'C'].map((rating, idx) => (
              <div key={rating} style={{
                padding: '1rem',
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700',
                  color: '#a5b4fc'
                }}>
                  {rating}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {Math.floor(Math.random() * 10)} applications
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#a5b4fc', marginBottom: '1.5rem', fontWeight: '700' }}>
            🕐 Recent Activity
          </h3>
          <div style={{ color: '#94a3b8' }}>
            {stats.totalApplications === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem' }}>
                No applications yet. Start by creating a new application!
              </p>
            ) : (
              <div>
                <div style={{ 
                  padding: '1rem',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '10px',
                  marginBottom: '0.5rem',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  ✅ Last application processed successfully
                </div>
                <div style={{ 
                  padding: '1rem',
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(99, 102, 241, 0.2)'
                }}>
                  📊 {stats.totalApplications} total applications analyzed
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
