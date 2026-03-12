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

    // Validation
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

    // Simulate signup
    setTimeout(() => {
      // Save user data
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if username already exists
      if (users.find(u => u.username === formData.username)) {
        setError('Username already exists');
        setLoading(false);
        return;
      }

      // Check if email already exists
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
      
      // Show success message and redirect to login
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
        maxWidth: '550px', 
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
            Create Account
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Join us to access advanced credit analysis tools
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
            ⚠️ {error}
          </div>
        )}

        {/* SignUp Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label className="label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                className="input"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label className="label">Username *</label>
              <input
                type="text"
                name="username"
                className="input"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">Organization</label>
              <input
                type="text"
                name="organization"
                className="input"
                placeholder="Company Name"
                value={formData.organization}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="label">Role</label>
            <select
              name="role"
              className="input"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="analyst">Credit Analyst</option>
              <option value="manager">Credit Manager</option>
              <option value="officer">Loan Officer</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label className="label">Password *</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                className="input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.75rem',
              cursor: 'pointer',
              color: '#cbd5e1',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                style={{ 
                  width: '18px', 
                  height: '18px',
                  cursor: 'pointer',
                  accentColor: '#6366f1',
                  marginTop: '2px',
                  flexShrink: 0
                }}
              />
              <span>
                I agree to the{' '}
                <a 
                  href="#terms" 
                  style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: '600' }}
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
                  style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: '600' }}
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

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn" 
            disabled={loading}
            style={{ width: '100%', marginBottom: '1.5rem' }}
          >
            {loading ? '⏳ Creating Account...' : '🚀 Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(148, 163, 184, 0.2)'
        }}>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Already have an account?{' '}
          </span>
          <a 
            href="#login" 
            style={{ 
              color: '#a5b4fc', 
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

export default SignUp;