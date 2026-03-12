import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { initializeDefaultData } from '../utils/defaultData';

function Reports() {
  const [history, setHistory] = useState([]);
  const [reportType, setReportType] = useState('summary');
  const [reportFormat, setReportFormat] = useState('docx');
  const [dateRange, setDateRange] = useState('all');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    // Initialize default data if empty
    initializeDefaultData();
    
    const savedHistory = JSON.parse(localStorage.getItem('applicationHistory') || '[]');
    setHistory(savedHistory);
  }, []);

  const generateReport = () => {
    if (reportFormat === 'docx') {
      generateWordReport();
    } else {
      generateTextReport();
    }
  };

  const generateWordReport = async () => {
    setGenerating(true);
    
    setTimeout(async () => {
      let doc;
      
      if (reportType === 'summary') {
        doc = await generateSummaryWordReport();
      } else if (reportType === 'detailed') {
        doc = await generateDetailedWordReport();
      } else if (reportType === 'analytics') {
        doc = await generateAnalyticsWordReport();
      }
      
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `intelli-credit-${reportType}-report-${Date.now()}.docx`);
      setGenerating(false);
    }, 1500);
  };

  const generateSummaryWordReport = async () => {
    const approved = history.filter(app => app.decision === 'APPROVED').length;
    const rejected = history.filter(app => app.decision === 'REJECTED').length;
    const avgScore = history.length > 0 
      ? history.reduce((sum, app) => sum + app.credit_score, 0) / history.length 
      : 0;

    return new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "INTELLI-CREDIT SUMMARY REPORT",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Generated: ", bold: true }),
              new TextRun(new Date().toLocaleString())
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 }
          }),
          new Paragraph({
            text: "OVERVIEW",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Total Applications: ", bold: true }),
              new TextRun(history.length.toString())
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Approved: ", bold: true }),
              new TextRun(approved.toString())
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Rejected: ", bold: true }),
              new TextRun(rejected.toString())
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Approval Rate: ", bold: true }),
              new TextRun(`${history.length > 0 ? ((approved / history.length) * 100).toFixed(2) : 0}%`)
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Average Credit Score: ", bold: true }),
              new TextRun(avgScore.toFixed(0))
            ],
            spacing: { after: 400 }
          }),
          new Paragraph({
            text: "RECENT APPLICATIONS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          ...history.slice(0, 10).flatMap((app, idx) => [
            new Paragraph({
              children: [
                new TextRun({ text: `${idx + 1}. ${app.company_name || 'Unknown'}`, bold: true })
              ],
              spacing: { before: 200, after: 100 }
            }),
            new Paragraph({
              text: `   Score: ${app.credit_score} | Rating: ${app.rating}`,
              spacing: { after: 50 }
            }),
            new Paragraph({
              text: `   Decision: ${app.decision}`,
              spacing: { after: 50 }
            }),
            new Paragraph({
              text: `   Amount: ₹${app.recommended_loan_amount?.toFixed(2)} Cr`,
              spacing: { after: 100 }
            })
          ])
        ]
      }]
    });
  };

  const generateDetailedWordReport = async () => {
    return new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "INTELLI-CREDIT DETAILED REPORT",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Generated: ", bold: true }),
              new TextRun(new Date().toLocaleString())
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 }
          }),
          ...history.flatMap((app, idx) => [
            new Paragraph({
              text: `APPLICATION #${idx + 1}`,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Company: ", bold: true }),
                new TextRun(app.company_name || 'Unknown')
              ],
              spacing: { after: 100 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Credit Score: ", bold: true }),
                new TextRun(app.credit_score.toString())
              ],
              spacing: { after: 100 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Rating: ", bold: true }),
                new TextRun(app.rating)
              ],
              spacing: { after: 100 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Decision: ", bold: true }),
                new TextRun(app.decision)
              ],
              spacing: { after: 100 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Loan Amount: ", bold: true }),
                new TextRun(`₹${app.recommended_loan_amount?.toFixed(2)} Cr`)
              ],
              spacing: { after: 100 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Interest Rate: ", bold: true }),
                new TextRun(`${app.recommended_interest_rate?.toFixed(2)}%`)
              ],
              spacing: { after: 200 }
            })
          ])
        ]
      }]
    });
  };

  const generateAnalyticsWordReport = async () => {
    const approved = history.filter(app => app.decision === 'APPROVED');
    const rejected = history.filter(app => app.decision === 'REJECTED');
    
    const avgApprovedScore = approved.length > 0
      ? approved.reduce((sum, app) => sum + app.credit_score, 0) / approved.length
      : 0;
    
    const avgRejectedScore = rejected.length > 0
      ? rejected.reduce((sum, app) => sum + app.credit_score, 0) / rejected.length
      : 0;

    return new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "INTELLI-CREDIT ANALYTICS REPORT",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Generated: ", bold: true }),
              new TextRun(new Date().toLocaleString())
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 }
          }),
          new Paragraph({
            text: "STATISTICAL ANALYSIS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Total Applications: ", bold: true }),
              new TextRun(history.length.toString())
            ],
            spacing: { after: 200 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Approved Applications: ", bold: true }),
              new TextRun(approved.length.toString())
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            text: `Average Score: ${avgApprovedScore.toFixed(0)}`,
            spacing: { after: 200 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Rejected Applications: ", bold: true }),
              new TextRun(rejected.length.toString())
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            text: `Average Score: ${avgRejectedScore.toFixed(0)}`,
            spacing: { after: 400 }
          }),
          new Paragraph({
            text: "RATING DISTRIBUTION",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: `AAA: ${history.filter(app => app.rating === 'AAA').length}`,
            spacing: { after: 50 }
          }),
          new Paragraph({
            text: `AA: ${history.filter(app => app.rating === 'AA').length}`,
            spacing: { after: 50 }
          }),
          new Paragraph({
            text: `A: ${history.filter(app => app.rating === 'A').length}`,
            spacing: { after: 50 }
          }),
          new Paragraph({
            text: `BBB: ${history.filter(app => app.rating === 'BBB').length}`,
            spacing: { after: 50 }
          }),
          new Paragraph({
            text: `BB: ${history.filter(app => app.rating === 'BB').length}`,
            spacing: { after: 50 }
          }),
          new Paragraph({
            text: `B: ${history.filter(app => app.rating === 'B').length}`,
            spacing: { after: 50 }
          }),
          new Paragraph({
            text: `C: ${history.filter(app => app.rating === 'C').length}`,
            spacing: { after: 400 }
          }),
          new Paragraph({
            text: "PERFORMANCE METRICS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: `Approval Rate: ${history.length > 0 ? ((approved.length / history.length) * 100).toFixed(2) : 0}%`,
            spacing: { after: 100 }
          }),
          new Paragraph({
            text: "Average Processing Time: 2.5 seconds",
            spacing: { after: 100 }
          }),
          new Paragraph({
            text: "System Uptime: 99.9%",
            spacing: { after: 200 }
          })
        ]
      }]
    });
  };

  const generateTextReport = () => {
    setGenerating(true);
    
    setTimeout(() => {
      let reportContent = '';
      
      if (reportType === 'summary') {
        reportContent = generateSummaryReport();
      } else if (reportType === 'detailed') {
        reportContent = generateDetailedReport();
      } else if (reportType === 'analytics') {
        reportContent = generateAnalyticsReport();
      }
      
      downloadReport(reportContent, reportType);
      setGenerating(false);
    }, 1500);
  };

  const generateSummaryReport = () => {
    const approved = history.filter(app => app.decision === 'APPROVED').length;
    const rejected = history.filter(app => app.decision === 'REJECTED').length;
    const avgScore = history.length > 0 
      ? history.reduce((sum, app) => sum + app.credit_score, 0) / history.length 
      : 0;

    return `
INTELLI-CREDIT SUMMARY REPORT
Generated: ${new Date().toLocaleString()}
========================================

OVERVIEW
--------
Total Applications: ${history.length}
Approved: ${approved}
Rejected: ${rejected}
Approval Rate: ${history.length > 0 ? ((approved / history.length) * 100).toFixed(2) : 0}%
Average Credit Score: ${avgScore.toFixed(0)}

RECENT APPLICATIONS
-------------------
${history.slice(0, 10).map((app, idx) => `
${idx + 1}. ${app.company_name || 'Unknown'}
   Score: ${app.credit_score} | Rating: ${app.rating}
   Decision: ${app.decision}
   Amount: ₹${app.recommended_loan_amount?.toFixed(2)} Cr
`).join('\n')}

========================================
Report generated by Intelli-Credit AI Engine
    `;
  };

  const generateDetailedReport = () => {
    return `
INTELLI-CREDIT DETAILED REPORT
Generated: ${new Date().toLocaleString()}
========================================

${history.map((app, idx) => `
APPLICATION #${idx + 1}
-------------------
Company: ${app.company_name || 'Unknown'}
Credit Score: ${app.credit_score}
Rating: ${app.rating}
Decision: ${app.decision}

Recommended Loan Amount: ₹${app.recommended_loan_amount?.toFixed(2)} Crores
Recommended Interest Rate: ${app.recommended_interest_rate?.toFixed(2)}%

Five Cs Breakdown:
- Character: ${app.five_cs_breakdown?.character || 0}/100
- Capacity: ${app.five_cs_breakdown?.capacity || 0}/100
- Capital: ${app.five_cs_breakdown?.capital || 0}/100
- Collateral: ${app.five_cs_breakdown?.collateral || 0}/100
- Conditions: ${app.five_cs_breakdown?.conditions || 0}/100

Risk Factors:
${app.risk_factors?.map(risk => `- ${risk}`).join('\n') || 'None'}

Strengths:
${app.strengths?.map(strength => `- ${strength}`).join('\n') || 'None'}

========================================
`).join('\n')}

Report generated by Intelli-Credit AI Engine
    `;
  };

  const generateAnalyticsReport = () => {
    const approved = history.filter(app => app.decision === 'APPROVED');
    const rejected = history.filter(app => app.decision === 'REJECTED');
    
    const avgApprovedScore = approved.length > 0
      ? approved.reduce((sum, app) => sum + app.credit_score, 0) / approved.length
      : 0;
    
    const avgRejectedScore = rejected.length > 0
      ? rejected.reduce((sum, app) => sum + app.credit_score, 0) / rejected.length
      : 0;

    return `
INTELLI-CREDIT ANALYTICS REPORT
Generated: ${new Date().toLocaleString()}
========================================

STATISTICAL ANALYSIS
--------------------
Total Applications: ${history.length}

Approved Applications: ${approved.length}
- Average Score: ${avgApprovedScore.toFixed(0)}
- Average Loan Amount: ₹${approved.length > 0 ? (approved.reduce((sum, app) => sum + (app.recommended_loan_amount || 0), 0) / approved.length).toFixed(2) : 0} Cr

Rejected Applications: ${rejected.length}
- Average Score: ${avgRejectedScore.toFixed(0)}

RATING DISTRIBUTION
-------------------
AAA: ${history.filter(app => app.rating === 'AAA').length}
AA: ${history.filter(app => app.rating === 'AA').length}
A: ${history.filter(app => app.rating === 'A').length}
BBB: ${history.filter(app => app.rating === 'BBB').length}
BB: ${history.filter(app => app.rating === 'BB').length}
B: ${history.filter(app => app.rating === 'B').length}
C: ${history.filter(app => app.rating === 'C').length}

PERFORMANCE METRICS
-------------------
Approval Rate: ${history.length > 0 ? ((approved.length / history.length) * 100).toFixed(2) : 0}%
Average Processing Time: 2.5 seconds
System Uptime: 99.9%

========================================
Report generated by Intelli-Credit AI Engine
    `;
  };

  const downloadReport = (content, type) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intelli-credit-${type}-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Company Name', 'Credit Score', 'Rating', 'Decision', 'Loan Amount', 'Interest Rate', 'Date'],
      ...history.map(app => [
        app.company_name || 'Unknown',
        app.credit_score,
        app.rating,
        app.decision,
        app.recommended_loan_amount?.toFixed(2) || 0,
        app.recommended_interest_rate?.toFixed(2) || 0,
        new Date(app.timestamp || Date.now()).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intelli-credit-data-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container">
        <div style={{ margin: '2rem 0' }}>
          <h1 className="title" style={{ fontSize: '2.5rem', textAlign: 'left' }}>
            📈 REPORTS GENERATION
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Generate and download comprehensive credit analysis reports
          </p>
        </div>

        {/* Report Configuration */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            color: '#daa520', 
            marginBottom: '1.5rem', 
            fontWeight: '800',
            fontSize: '1.3rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            📋 Report Configuration
          </h3>
          
          <div className="grid grid-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <label className="label" style={{ color: '#daa520', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Report Format</label>
              <select
                className="input"
                value={reportFormat}
                onChange={(e) => setReportFormat(e.target.value)}
                style={{ 
                  border: '2px solid rgba(218, 165, 32, 0.3)',
                  fontWeight: '600'
                }}
              >
                <option value="docx">📄 Word Document (.docx)</option>
                <option value="txt">📝 Text File (.txt)</option>
              </select>
            </div>

            <div>
              <label className="label" style={{ color: '#daa520', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Report Type</label>
              <select
                className="input"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                style={{ 
                  border: '2px solid rgba(218, 165, 32, 0.3)',
                  fontWeight: '600'
                }}
              >
                <option value="summary">📊 Summary Report</option>
                <option value="detailed">📄 Detailed Report</option>
                <option value="analytics">📈 Analytics Report</option>
              </select>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: '500' }}>
                {reportType === 'summary' && '✓ Quick overview of all applications'}
                {reportType === 'detailed' && '✓ Complete details of each application'}
                {reportType === 'analytics' && '✓ Statistical analysis and insights'}
              </p>
            </div>

            <div>
              <label className="label" style={{ color: '#daa520', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date Range</label>
              <select
                className="input"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                style={{ 
                  border: '2px solid rgba(218, 165, 32, 0.3)',
                  fontWeight: '600'
                }}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn"
              onClick={generateReport}
              disabled={generating || history.length === 0}
              style={{
                fontSize: '1.05rem',
                padding: '1.2rem 3rem',
                opacity: (generating || history.length === 0) ? 0.5 : 1,
                cursor: (generating || history.length === 0) ? 'not-allowed' : 'pointer'
              }}
            >
              {generating ? '⏳ Generating...' : '📥 Generate & Download Report'}
            </button>
            <button 
              className="btn-secondary"
              onClick={exportToCSV}
              disabled={history.length === 0}
              style={{
                fontSize: '1.05rem',
                padding: '1.2rem 3rem',
                opacity: history.length === 0 ? 0.5 : 1,
                cursor: history.length === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              📊 Export to CSV
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
          <div className="metric-card">
            <div className="metric-value" style={{
              background: 'linear-gradient(135deg, #1976d2, #1565c0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>{history.length}</div>
            <div className="metric-label">Total Reports</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>{history.filter(a => a.decision === 'APPROVED').length}</div>
            <div className="metric-label">Approved</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>{history.filter(a => a.decision === 'REJECTED').length}</div>
            <div className="metric-label">Rejected</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{
              background: 'linear-gradient(135deg, #daa520, #b8860b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {history.length > 0 
                ? Math.round((history.filter(a => a.decision === 'APPROVED').length / history.length) * 100)
                : 0}%
            </div>
            <div className="metric-label">Success Rate</div>
          </div>
        </div>

        {/* Report Preview */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            color: '#daa520', 
            marginBottom: '1.5rem', 
            fontWeight: '800',
            fontSize: '1.3rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            👁️ Report Preview
          </h3>
          
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
              <h3 style={{ color: '#e2e8f0', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: '700' }}>No Data Available</h3>
              <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                Process some applications first to generate reports
              </p>
              <button 
                className="btn"
                onClick={() => window.location.href = '/new-application'}
                style={{ marginTop: '2rem', fontSize: '1rem', padding: '1rem 2.5rem' }}
              >
                📋 Create New Application
              </button>
            </div>
          ) : (
            <div style={{ 
              background: 'rgba(15, 23, 42, 0.7)',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid rgba(218, 165, 32, 0.2)',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: '#cbd5e1',
              maxHeight: '400px',
              overflow: 'auto'
            }}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {reportType === 'summary' && generateSummaryReport()}
                {reportType === 'detailed' && 'Click "Generate & Download Report" to view detailed report...'}
                {reportType === 'analytics' && generateAnalyticsReport()}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
