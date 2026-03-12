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

    setTimeout(() => {
      if (formData.email && formData.password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === formData.email && u.password === formData.password);
        
        if (user) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', user.username);
          localStorage.setItem('userFullName', user.fullName);
          navigate('/');
        }
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
        maxWidth: '440px', 
        width: '100%',
        padding: '2.5rem'
      }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#e2e8f0', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Login
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Log in to your dashboard
          </p>
        </div>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem', padding: '1rem', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="label" style={{ fontSize: '0.9rem' }}>Username</label>
            <input
              type="text"
              name="email"
              className="input"
              placeholder="Enter your username"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ padding: '0.9rem 1.1rem', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="label" style={{ fontSize: '0.9rem' }}>Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ padding: '0.9rem 1.1rem', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.75rem'
          }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              cursor: 'pointer',
              color: '#cbd5e1',
              fontSize: '0.85rem'
            }}>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                style={{ 
                  width: '17px', 
                  height: '17px',
                  cursor: 'pointer',
                  accentColor: '#1976d2'
                }}
              />
              Remember me
            </label>
            <a 
              href="#forgot" 
              style={{ 
                color: '#64b5f6', 
                textDecoration: 'none',
                fontSize: '0.85rem',
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

          <button 
            type="submit" 
            className="btn" 
            disabled={loading}
            style={{ width: '100%', marginBottom: '1.5rem', padding: '1rem' }}
          >
            {loading ? '⏳ Logging In...' : '🚀 Log In'}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(148, 163, 184, 0.2)'
        }}>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Don't have an account?{' '}
          </span>
          <a 
            href="#signup" 
            style={{ 
              color: '#64b5f6', 
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

        <div style={{ 
          textAlign: 'center', 
          marginTop: '1.25rem',
          color: '#64748b',
          fontSize: '0.8rem'
        }}>
          © 2024 Intelli-Credit. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Login;
