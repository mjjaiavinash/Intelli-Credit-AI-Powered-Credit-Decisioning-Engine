import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    organization: '',
    role: 'analyst',
    terms: false
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

    if (!formData.fullName || !formData.email || !formData.username || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.terms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.find(u => u.username === formData.username)) {
        setError('Username already exists');
        setLoading(false);
        return;
      }

      if (users.find(u => u.email === formData.email)) {
        setError('Email already exists');
        setLoading(false);
        return;
      }

      users.push({
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        organization: formData.organization,
        role: formData.role,
        createdAt: Date.now()
      });

      localStorage.setItem('users', JSON.stringify(users));
      setLoading(false);
      alert(`Account created successfully!\n\nUsername: ${formData.username}\nYou can now login with your credentials.`);
      navigate('/login');
    }, 1500);
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
        maxWidth: '520px', 
        width: '100%',
        padding: '2.5rem'
      }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#e2e8f0', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Create Account
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Join us to access advanced tools
          </p>
        </div>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem', padding: '1rem', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="label" style={{ fontSize: '0.9rem' }}>Full Name *</label>
              <input
                type="text"
                name="fullName"
                className="input"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={{ padding: '0.9rem 1.1rem', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label className="label" style={{ fontSize: '0.9rem' }}>Email *</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ padding: '0.9rem 1.1rem', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="label" style={{ fontSize: '0.9rem' }}>Username *</label>
              <input
                type="text"
                name="username"
                className="input"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                required
                style={{ padding: '0.9rem 1.1rem', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label className="label" style={{ fontSize: '0.9rem' }}>Organization</label>
              <input
                type="text"
                name="organization"
                className="input"
                placeholder="Company Name"
                value={formData.organization}
                onChange={handleChange}
                style={{ padding: '0.9rem 1.1rem', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="label" style={{ fontSize: '0.9rem' }}>Role</label>
            <select
              name="role"
              className="input"
              value={formData.role}
              onChange={handleChange}
              style={{ padding: '0.9rem 1.1rem', fontSize: '0.95rem' }}
            >
              <option value="analyst">Credit Analyst</option>
              <option value="manager">Credit Manager</option>
              <option value="officer">Loan Officer</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="label" style={{ fontSize: '0.9rem' }}>Password *</label>
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

            <div>
              <label className="label" style={{ fontSize: '0.9rem' }}>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                className="input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{ padding: '0.9rem 1.1rem', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.5rem',
              cursor: 'pointer',
              color: '#cbd5e1',
              fontSize: '0.85rem',
              lineHeight: '1.5'
            }}>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                style={{ 
                  width: '17px', 
                  height: '17px',
                  cursor: 'pointer',
                  accentColor: '#1976d2',
                  marginTop: '2px',
                  flexShrink: 0
                }}
              />
              <span>
                I agree to the{' '}
                <a 
                  href="#terms" 
                  style={{ color: '#64b5f6', textDecoration: 'none', fontWeight: '600' }}
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Terms and Conditions:\n\n1. Use responsibly\n2. Protect your credentials\n3. Follow data privacy guidelines');
                  }}
                >
                  Terms and Conditions
                </a>
                {' '}and{' '}
                <a 
                  href="#privacy" 
                  style={{ color: '#64b5f6', textDecoration: 'none', fontWeight: '600' }}
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Privacy Policy:\n\nYour data is secure and encrypted.');
                  }}
                >
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn" 
            disabled={loading}
            style={{ width: '100%', marginBottom: '1.5rem', padding: '1rem' }}
          >
            {loading ? '⏳ Creating Account...' : '🚀 Create Account'}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(148, 163, 184, 0.2)'
        }}>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Already have an account?{' '}
          </span>
          <a 
            href="#login" 
            style={{ 
              color: '#64b5f6', 
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.9rem'
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Sign In
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

export default SignUp;
