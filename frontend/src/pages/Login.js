import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate login
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Check registered users first
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === formData.email && u.password === formData.password);
        
        if (user) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', user.username);
          localStorage.setItem('userFullName', user.fullName);
          navigate('/');
        }
        // Default demo credentials
        else if (formData.email === 'mjjaiavinash' && formData.password === 'jai123') {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', formData.email);
          navigate('/');
        } else if (formData.email === 'admin' && formData.password === 'admin123') {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', formData.email);
          localStorage.setItem('userRole', 'admin');
          navigate('/');
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError('Please fill in all fields');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="gradient-bg" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="card" style={{ 
        maxWidth: '450px', 
        width: '100%',
        position: 'relative',
        overflow: 'visible'
      }}>
        {/* Logo/Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            fontSize: '3.5rem', 
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.5))'
          }}>
            🏦
          </div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '900',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            Intelli-Credit
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            AI-Powered Credit Decisioning
          </p>
        </div>

        {/* Welcome Text */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#e2e8f0', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Welcome Back
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Sign in to access your credit analysis dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="label">Username</label>
            <input
              type="text"
              name="email"
              className="input"
              placeholder="Enter your username"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              cursor: 'pointer',
              color: '#cbd5e1',
              fontSize: '0.9rem'
            }}>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                style={{ 
                  width: '18px', 
                  height: '18px',
                  cursor: 'pointer',
                  accentColor: '#6366f1'
                }}
              />
              Remember me
            </label>
            <a 
              href="#forgot" 
              style={{ 
                color: '#a5b4fc', 
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
              onClick={(e) => {
                e.preventDefault();
                alert('Password reset functionality coming soon!');
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn" 
            disabled={loading}
            style={{ width: '100%', marginBottom: '1.5rem' }}
          >
            {loading ? '⏳ Signing In...' : '🚀 Sign In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(148, 163, 184, 0.2)'
        }}>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Don't have an account?{' '}
          </span>
          <a 
            href="#signup" 
            style={{ 
              color: '#a5b4fc', 
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.9rem'
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
          >
            Sign Up
          </a>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          color: '#64748b',
          fontSize: '0.8rem'
        }}>
          © 2024 Intelli-Credit. All rights reserved.
        </div>
      </div>

      {/* Background Decorations */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
    </div>
  );
}

export default Login;
