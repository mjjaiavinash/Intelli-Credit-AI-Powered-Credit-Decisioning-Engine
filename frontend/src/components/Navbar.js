import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const userEmail = localStorage.getItem('userEmail');
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  const navStyle = {
    background: 'rgba(10, 22, 40, 0.95)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 2px 16px rgba(0, 0, 0, 0.5)',
    padding: '0.75rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid rgba(218, 165, 32, 0.2)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  };

  const linkStyle = {
    color: '#94a3b8',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const activeLinkStyle = {
    ...linkStyle,
    background: 'rgba(25, 118, 210, 0.2)',
    color: '#64b5f6',
    boxShadow: '0 0 12px rgba(25, 118, 210, 0.3)',
    borderBottom: '2px solid #daa520'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={{ 
        background: 'linear-gradient(135deg, #1976d2, #daa520)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textDecoration: 'none', 
        fontSize: '1.3rem', 
        fontWeight: '900',
        letterSpacing: '0.5px',
        textTransform: 'uppercase'
      }}>
        🏦 Intelli-Credit
      </Link>
      
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Link 
          to="/" 
          style={location.pathname === '/' ? activeLinkStyle : linkStyle}
        >
          Home
        </Link>
        <Link 
          to="/new-application" 
          style={location.pathname === '/new-application' ? activeLinkStyle : linkStyle}
        >
          New Application
        </Link>
        <Link 
          to="/analytics" 
          style={location.pathname === '/analytics' ? activeLinkStyle : linkStyle}
        >
          Analytics
        </Link>
        <Link 
          to="/history" 
          style={location.pathname === '/history' ? activeLinkStyle : linkStyle}
        >
          History
        </Link>
        <Link 
          to="/reports" 
          style={location.pathname === '/reports' ? activeLinkStyle : linkStyle}
        >
          Reports
        </Link>
        <Link 
          to="/settings" 
          style={location.pathname === '/settings' ? activeLinkStyle : linkStyle}
        >
          Settings
        </Link>
        <Link 
          to="/about" 
          style={location.pathname === '/about' ? activeLinkStyle : linkStyle}
        >
          About
        </Link>
        
        {/* User Menu */}
        <div style={{ 
          marginLeft: '0.75rem',
          paddingLeft: '0.75rem',
          borderLeft: '1px solid rgba(148, 163, 184, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {isAuthenticated ? (
            <>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                {userEmail}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  ...linkStyle,
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: 'none',
                  color: '#fca5a5',
                  cursor: 'pointer',
                  padding: '0.6rem 1.2rem'
                }}
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                ...linkStyle,
                background: 'rgba(25, 118, 210, 0.2)',
                border: '1px solid rgba(25, 118, 210, 0.4)',
                color: '#64b5f6',
                cursor: 'pointer',
                padding: '0.4rem 0.9rem'
              }}
            >
              🔐 Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
