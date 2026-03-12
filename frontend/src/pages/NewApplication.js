import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

function NewApplication() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [uploadMode, setUploadMode] = useState(true);
  const [files, setFiles] = useState({
    financials: null,
    gst: null,
    bankStatement: null,
    mca: null
  });
  const [formData, setFormData] = useState({
    companyName: '',
    sector: 'Manufacturing',
    incorporationYear: 2015,
    promoters: '',
    revenue: 100,
    ebitda: 15,
    netProfit: 8,
    totalDebt: 40,
    netWorth: 60,
    gstTurnover: 95,
    capacityUtilization: 75,
    managementQuality: 7,
    siteVisitScore: 7
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProcessingStep(0);

    const steps = [
      'Ingesting data from documents...',
      'Running AI research agent...',
      'Calculating credit score...',
      'Generating CAM report...'
    ];

    // Simulate step-by-step processing
    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    try {
      let response;
      if (uploadMode) {
        // File upload mode
        const formDataObj = new FormData();
        formDataObj.append('companyName', formData.companyName);
        formDataObj.append('sector', formData.sector);
        formDataObj.append('incorporationYear', formData.incorporationYear);
        formDataObj.append('promoters', formData.promoters);
        
        if (files.financials) formDataObj.append('financials', files.financials);
        if (files.gst) formDataObj.append('gst', files.gst);
        if (files.bankStatement) formDataObj.append('bankStatement', files.bankStatement);
        if (files.mca) formDataObj.append('mca', files.mca);
        
        response = await api.processApplicationWithFiles(formDataObj);
      } else {
        // Manual entry mode
        response = await api.processApplication(formData);
      }
      
      localStorage.setItem('results', JSON.stringify(response));
      navigate('/results');
    } catch (error) {
      alert('Error processing application: ' + error.message);
    } finally {
      setLoading(false);
      setProcessingStep(0);
    }
  };

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container">
        <div className="card" style={{ maxWidth: '900px', margin: '2rem auto' }}>
          <h1 className="title" style={{ fontSize: '2.5rem' }}>
            📋 New Credit Application
          </h1>
          <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '1rem' }}>
            Upload documents or enter details manually for instant credit analysis
          </p>

          {/* Toggle Mode */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button
              type="button"
              className={uploadMode ? 'btn' : 'btn-secondary'}
              onClick={() => setUploadMode(true)}
              style={{ marginRight: '1rem' }}
            >
              📁 Upload Documents
            </button>
            <button
              type="button"
              className={!uploadMode ? 'btn' : 'btn-secondary'}
              onClick={() => setUploadMode(false)}
            >
              ✍️ Manual Entry
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <h3 style={{ color: '#a5b4fc', marginBottom: '1rem', fontWeight: '700' }}>Company Information</h3>
            <div className="grid grid-2">
              <div>
                <label className="label">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  className="input"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="label">Sector *</label>
                <select
                  name="sector"
                  className="input"
                  value={formData.sector}
                  onChange={handleChange}
                >
                  <option>Manufacturing</option>
                  <option>Services</option>
                  <option>Trading</option>
                  <option>NBFC</option>
                  <option>IT/Software</option>
                </select>
              </div>
              <div>
                <label className="label">Incorporation Year</label>
                <input
                  type="number"
                  name="incorporationYear"
                  className="input"
                  value={formData.incorporationYear}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="label">Promoters (comma separated)</label>
                <input
                  type="text"
                  name="promoters"
                  className="input"
                  placeholder="John Doe, Jane Smith"
                  value={formData.promoters}
                  onChange={handleChange}
                />
              </div>
            </div>

            {uploadMode ? (
              /* File Upload Mode */
              <>
                <h3 style={{ color: '#a5b4fc', margin: '2rem 0 1rem', fontWeight: '700' }}>📄 Upload Documents</h3>
                <div className="grid grid-2">
                  <div className="file-upload">
                    <label className="label">📊 Financial Statements</label>
                    <input
                      type="file"
                      name="financials"
                      id="financials"
                      accept=".pdf,.xlsx,.xls"
                      onChange={handleFileChange}
                    />
                    <label 
                      htmlFor="financials" 
                      className={`file-upload-label ${files.financials ? 'has-file' : ''}`}
                    >
                      <span className="file-upload-icon">📊</span>
                      {files.financials ? 'Change File' : 'Choose PDF/Excel File'}
                    </label>
                    {files.financials && (
                      <div className="file-name">
                        <span>✓</span>
                        <span>{files.financials.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="file-upload">
                    <label className="label">🧾 GST Returns</label>
                    <input
                      type="file"
                      name="gst"
                      id="gst"
                      accept=".json,.pdf"
                      onChange={handleFileChange}
                    />
                    <label 
                      htmlFor="gst" 
                      className={`file-upload-label ${files.gst ? 'has-file' : ''}`}
                    >
                      <span className="file-upload-icon">🧾</span>
                      {files.gst ? 'Change File' : 'Choose JSON/PDF File'}
                    </label>
                    {files.gst && (
                      <div className="file-name">
                        <span>✓</span>
                        <span>{files.gst.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="file-upload">
                    <label className="label">🏦 Bank Statement</label>
                    <input
                      type="file"
                      name="bankStatement"
                      id="bankStatement"
                      accept=".csv,.pdf"
                      onChange={handleFileChange}
                    />
                    <label 
                      htmlFor="bankStatement" 
                      className={`file-upload-label ${files.bankStatement ? 'has-file' : ''}`}
                    >
                      <span className="file-upload-icon">🏦</span>
                      {files.bankStatement ? 'Change File' : 'Choose CSV/PDF File'}
                    </label>
                    {files.bankStatement && (
                      <div className="file-name">
                        <span>✓</span>
                        <span>{files.bankStatement.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="file-upload">
                    <label className="label">📋 MCA Filings</label>
                    <input
                      type="file"
                      name="mca"
                      id="mca"
                      accept=".json,.pdf"
                      onChange={handleFileChange}
                    />
                    <label 
                      htmlFor="mca" 
                      className={`file-upload-label ${files.mca ? 'has-file' : ''}`}
                    >
                      <span className="file-upload-icon">📋</span>
                      {files.mca ? 'Change File' : 'Choose JSON/PDF File'}
                    </label>
                    {files.mca && (
                      <div className="file-name">
                        <span>✓</span>
                        <span>{files.mca.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* Manual Entry Mode */
              <>
                <h3 style={{ color: '#a5b4fc', margin: '2rem 0 1rem', fontWeight: '700' }}>Financial Data (₹ Crores)</h3>
                <div className="grid grid-3">
                  <div>
                    <label className="label">Revenue</label>
                    <input
                      type="number"
                      name="revenue"
                      className="input"
                      value={formData.revenue}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="label">EBITDA</label>
                    <input
                      type="number"
                      name="ebitda"
                      className="input"
                      value={formData.ebitda}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="label">Net Profit</label>
                    <input
                      type="number"
                      name="netProfit"
                      className="input"
                      value={formData.netProfit}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="label">Total Debt</label>
                    <input
                      type="number"
                      name="totalDebt"
                      className="input"
                      value={formData.totalDebt}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="label">Net Worth</label>
                    <input
                      type="number"
                      name="netWorth"
                      className="input"
                      value={formData.netWorth}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="label">GST Turnover</label>
                    <input
                      type="number"
                      name="gstTurnover"
                      className="input"
                      value={formData.gstTurnover}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}



            <h3 style={{ color: '#a5b4fc', margin: '2rem 0 1rem', fontWeight: '700' }}>Primary Insights</h3>
            <div className="grid grid-3">
              <div>
                <label className="label">Capacity Utilization (%)</label>
                <input
                  type="range"
                  name="capacityUtilization"
                  min="0"
                  max="100"
                  value={formData.capacityUtilization}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
                <div style={{ textAlign: 'center', fontWeight: '700', color: '#e2e8f0', marginTop: '0.5rem' }}>
                  {formData.capacityUtilization}%
                </div>
              </div>
              <div>
                <label className="label">Management Quality (1-10)</label>
                <input
                  type="range"
                  name="managementQuality"
                  min="1"
                  max="10"
                  value={formData.managementQuality}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
                <div style={{ textAlign: 'center', fontWeight: '700', color: '#e2e8f0', marginTop: '0.5rem' }}>
                  {formData.managementQuality}/10
                </div>
              </div>
              <div>
                <label className="label">Site Visit Score (1-10)</label>
                <input
                  type="range"
                  name="siteVisitScore"
                  min="1"
                  max="10"
                  value={formData.siteVisitScore}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
                <div style={{ textAlign: 'center', fontWeight: '700', color: '#e2e8f0', marginTop: '0.5rem' }}>
                  {formData.siteVisitScore}/10
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              {loading ? (
                <div style={{ padding: '2rem' }}>
                  <div style={{
                    border: '4px solid rgba(25, 118, 210, 0.2)',
                    borderTop: '4px solid #1976d2',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    animation: 'spin 0.8s linear infinite',
                    margin: '0 auto 2rem'
                  }}></div>
                  <div style={{ marginTop: '2rem' }}>
                    <div style={{
                      padding: '1.5rem',
                      background: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: '12px',
                      border: '2px solid rgba(25, 118, 210, 0.3)',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ color: '#64b5f6', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>
                        Processing Your Application...
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: processingStep >= 1 ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(148, 163, 184, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            transition: 'all 0.5s ease',
                            animation: processingStep === 1 ? 'pulse 1s infinite' : 'none'
                          }}>
                            {processingStep > 1 ? '✓' : '1'}
                          </div>
                          <div style={{ 
                            color: processingStep >= 1 ? '#6ee7b7' : '#94a3b8',
                            fontWeight: '600',
                            transition: 'all 0.5s ease'
                          }}>
                            📄 Ingesting data from documents...
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: processingStep >= 2 ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(148, 163, 184, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            transition: 'all 0.5s ease',
                            animation: processingStep === 2 ? 'pulse 1s infinite' : 'none'
                          }}>
                            {processingStep > 2 ? '✓' : '2'}
                          </div>
                          <div style={{ 
                            color: processingStep >= 2 ? '#6ee7b7' : '#94a3b8',
                            fontWeight: '600',
                            transition: 'all 0.5s ease'
                          }}>
                            🔍 Running AI research agent...
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: processingStep >= 3 ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(148, 163, 184, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            transition: 'all 0.5s ease',
                            animation: processingStep === 3 ? 'pulse 1s infinite' : 'none'
                          }}>
                            {processingStep > 3 ? '✓' : '3'}
                          </div>
                          <div style={{ 
                            color: processingStep >= 3 ? '#6ee7b7' : '#94a3b8',
                            fontWeight: '600',
                            transition: 'all 0.5s ease'
                          }}>
                            ⚡ Calculating credit score...
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: processingStep >= 4 ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(148, 163, 184, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            transition: 'all 0.5s ease',
                            animation: processingStep === 4 ? 'pulse 1s infinite' : 'none'
                          }}>
                            {processingStep > 4 ? '✓' : '4'}
                          </div>
                          <div style={{ 
                            color: processingStep >= 4 ? '#6ee7b7' : '#94a3b8',
                            fontWeight: '600',
                            transition: 'all 0.5s ease'
                          }}>
                            📊 Generating CAM report...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button type="submit" className="btn" style={{ fontSize: '1.1rem', padding: '1.2rem 3.5rem' }}>
                  🚀 Process Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewApplication;
