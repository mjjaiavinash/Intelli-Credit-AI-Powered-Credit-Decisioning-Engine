import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Settings() {
  const [settings, setSettings] = useState({
    approvalThreshold: 600,
    baseInterestRate: 9.0,
    maxLoanAmount: 500,
    minCreditScore: 300,
    autoApprove: false,
    emailNotifications: true,
    darkMode: true,
    language: 'en'
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default?')) {
      setSettings({ approvalThreshold: 600, baseInterestRate: 9.0, maxLoanAmount: 500, minCreditScore: 300, autoApprove: false, emailNotifications: true, darkMode: true, language: 'en' });
    }
  };

  const toggleStyle = (active) => ({
    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
    background: active ? '#6366f1' : 'rgba(148, 163, 184, 0.3)',
    transition: '0.4s', borderRadius: '30px'
  });

  const knobStyle = (active) => ({
    position: 'absolute', height: '22px', width: '22px',
    left: active ? '34px' : '4px', bottom: '4px',
    background: 'white', transition: '0.4s', borderRadius: '50%'
  });

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container">
        <div style={{ margin: '2rem 0' }}>
          <h1 className="title" style={{ fontSize: '2.5rem', textAlign: 'left' }}>Settings</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Configure credit decisioning parameters and preferences</p>
        </div>

        {saved && <div className="alert alert-success" style={{ marginBottom: '2rem' }}>Settings saved successfully!</div>}

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#a5b4fc', marginBottom: '1.5rem', fontWeight: '700' }}>Credit Scoring Parameters</h3>
          <div className="grid grid-2" style={{ gap: '2rem' }}>
            <div>
              <label className="label">Approval Threshold (Credit Score)</label>
              <input type="number" name="approvalThreshold" className="input" value={settings.approvalThreshold} onChange={handleChange} min="300" max="1000" />
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem' }}>Minimum score required for approval (300-1000)</p>
            </div>
            <div>
              <label className="label">Base Interest Rate (%)</label>
              <input type="number" name="baseInterestRate" className="input" value={settings.baseInterestRate} onChange={handleChange} step="0.1" min="5" max="20" />
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem' }}>Base rate before risk premium (5-20%)</p>
            </div>
            <div>
              <label className="label">Maximum Loan Amount (Rs. Crores)</label>
              <input type="number" name="maxLoanAmount" className="input" value={settings.maxLoanAmount} onChange={handleChange} min="10" max="10000" />
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem' }}>Maximum loan amount that can be recommended</p>
            </div>
            <div>
              <label className="label">Minimum Credit Score</label>
              <input type="number" name="minCreditScore" className="input" value={settings.minCreditScore} onChange={handleChange} min="0" max="600" />
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem' }}>Minimum score to process application</p>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#a5b4fc', marginBottom: '1.5rem', fontWeight: '700' }}>Automation & Notifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { name: 'autoApprove', label: 'Auto-Approve Applications', desc: 'Automatically approve applications above threshold' },
              { name: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email alerts for new applications' }
            ].map(({ name, label, desc }) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <div>
                  <div style={{ color: '#e2e8f0', fontWeight: '600', marginBottom: '0.25rem' }}>{label}</div>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{desc}</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '30px' }}>
                  <input type="checkbox" name={name} checked={settings[name]} onChange={handleChange} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={toggleStyle(settings[name])}><span style={knobStyle(settings[name])}></span></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#a5b4fc', marginBottom: '1.5rem', fontWeight: '700' }}>Appearance & Language</h3>
          <div className="grid grid-2" style={{ gap: '2rem' }}>
            <div>
              <label className="label">Theme</label>
              <select name="darkMode" className="input" value={settings.darkMode} onChange={handleChange}>
                <option value={true}>Dark Mode</option>
                <option value={false}>Light Mode</option>
              </select>
            </div>
            <div>
              <label className="label">Language</label>
              <select name="language" className="input" value={settings.language} onChange={handleChange}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <button className="btn" onClick={handleSave}>Save Settings</button>
          <button className="btn-secondary" onClick={handleReset}>Reset to Default</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
