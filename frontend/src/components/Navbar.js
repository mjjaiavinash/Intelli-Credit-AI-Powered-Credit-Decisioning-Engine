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
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  };

  const linkStyle = {
    color: '#94a3b8',
    textDecoration: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '12px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem'
  };

  const activeLinkStyle = {
    ...linkStyle,
    background: 'rgba(99, 102, 241, 0.2)',
    color: '#a5b4fc',
    boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={{ 
        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textDecoration: 'none', 
        fontSize: '1.5rem', 
        fontWeight: '900',
        letterSpacing: '-0.5px'
      }}>
        🏦 Intelli-Credit
      </Link>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
          marginLeft: '1rem',
          paddingLeft: '1rem',
          borderLeft: '1px solid rgba(148, 163, 184, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          {isAuthenticated ? (
            <>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
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
                background: 'rgba(99, 102, 241, 0.2)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#a5b4fc',
                cursor: 'pointer',
                padding: '0.5rem 1rem'
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
