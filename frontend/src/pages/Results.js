import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('results');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults);
      
      // Save to history only if not already saved
      let history = JSON.parse(localStorage.getItem('applicationHistory') || '[]');
      
      // Remove duplicates based on company name and credit score
      const uniqueHistory = [];
      const seen = new Set();
      
      for (const entry of history) {
        const key = `${entry.company_name}-${entry.credit_score}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueHistory.push(entry);
        }
      }
      
      const newEntry = {
        ...parsedResults.recommendation,
        company_name: parsedResults.company_info?.company_name || 'Unknown',
        timestamp: Date.now()
      };
      
      // Check if this exact entry already exists
      const isDuplicate = uniqueHistory.some(entry => 
        entry.company_name === newEntry.company_name && 
        entry.credit_score === newEntry.credit_score
      );
      
      if (!isDuplicate) {
        uniqueHistory.unshift(newEntry);
      }
      
      localStorage.setItem('applicationHistory', JSON.stringify(uniqueHistory.slice(0, 50))); // Keep last 50
    } else {
      navigate('/new-application');
    }
  }, [navigate]);

  if (!results) {
    return <div className="spinner"></div>;
  }

  const { recommendation } = results;
  const isApproved = recommendation.decision === 'APPROVED';

  const downloadReport = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "CREDIT APPRAISAL REPORT",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Company: ", bold: true }),
              new TextRun(results.company_info?.company_name || 'Unknown')
            ],
            spacing: { after: 200 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Date: ", bold: true }),
              new TextRun(new Date().toLocaleDateString())
            ],
            spacing: { after: 400 }
          }),
          new Paragraph({
            text: "DECISION",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: recommendation.decision,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          new Paragraph({
            text: "KEY METRICS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Credit Score: ", bold: true }),
              new TextRun(recommendation.credit_score.toString())
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Rating: ", bold: true }),
              new TextRun(recommendation.rating)
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Loan Amount: ", bold: true }),
              new TextRun(`₹${recommendation.recommended_loan_amount.toFixed(2)} Cr`)
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Interest Rate: ", bold: true }),
              new TextRun(`${recommendation.recommended_interest_rate.toFixed(2)}%`)
            ],
            spacing: { after: 400 }
          }),
          new Paragraph({
            text: "FIVE Cs BREAKDOWN",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Character: ", bold: true }),
              new TextRun(Math.round(recommendation.five_cs_breakdown.character).toString())
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Capacity: ", bold: true }),
              new TextRun(Math.round(recommendation.five_cs_breakdown.capacity).toString())
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Capital: ", bold: true }),
              new TextRun(Math.round(recommendation.five_cs_breakdown.capital).toString())
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Collateral: ", bold: true }),
              new TextRun(Math.round(recommendation.five_cs_breakdown.collateral).toString())
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Conditions: ", bold: true }),
              new TextRun(Math.round(recommendation.five_cs_breakdown.conditions).toString())
            ],
            spacing: { after: 400 }
          }),
          new Paragraph({
            text: "RISK FACTORS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          ...(recommendation.risk_factors?.map((risk, i) => 
            new Paragraph({
              text: `${i + 1}. ${risk}`,
              spacing: { after: 100 }
            })
          ) || [new Paragraph({ text: "None", spacing: { after: 400 } })]),
          new Paragraph({
            text: "STRENGTHS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          ...(recommendation.strengths?.map((strength, i) => 
            new Paragraph({
              text: `${i + 1}. ${strength}`,
              spacing: { after: 100 }
            })
          ) || [new Paragraph({ text: "None", spacing: { after: 400 } })]),
          new Paragraph({
            text: "DETAILED EXPLANATION",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: recommendation.explanation,
            spacing: { after: 200 }
          })
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Credit_Report_${results.company_info?.company_name || 'Unknown'}_${Date.now()}.docx`);
  };

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container">
        <div className="card" style={{ maxWidth: '1000px', margin: '2rem auto' }}>
          <h1 className="title" style={{ fontSize: '2.5rem' }}>
            📊 Credit Appraisal Results
          </h1>

          {/* Decision */}
          <div className={`alert ${isApproved ? 'alert-success' : 'alert-error'}`}>
            <h2 style={{ fontSize: '2rem', textAlign: 'center' }}>
              {isApproved ? '✅ APPROVED' : '❌ REJECTED'}
            </h2>
          </div>

          {/* Metrics */}
          <div className="grid grid-4" style={{ marginTop: '2rem' }}>
            <div className="metric-card">
              <div className="metric-value">{recommendation.credit_score}</div>
              <div className="metric-label">Credit Score</div>
              <div style={{ color: '#667eea', fontWeight: '600', marginTop: '0.5rem' }}>
                {recommendation.rating}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-value">
                ₹{recommendation.recommended_loan_amount.toFixed(2)}
              </div>
              <div className="metric-label">Loan Amount (Cr)</div>
            </div>

            <div className="metric-card">
              <div className="metric-value">
                {recommendation.recommended_interest_rate.toFixed(2)}%
              </div>
              <div className="metric-label">Interest Rate</div>
            </div>

            <div className="metric-card">
              <div className="metric-value">
                {Math.round((recommendation.five_cs_breakdown.character + 
                  recommendation.five_cs_breakdown.capacity + 
                  recommendation.five_cs_breakdown.capital + 
                  recommendation.five_cs_breakdown.collateral + 
                  recommendation.five_cs_breakdown.conditions) / 5)}
              </div>
              <div className="metric-label">Avg Five Cs</div>
            </div>
          </div>

          {/* Five Cs Breakdown */}
          <h3 style={{ color: '#a5b4fc', marginTop: '3rem', marginBottom: '1rem', fontWeight: '700' }}>
            Five Cs Analysis
          </h3>
          <div className="grid grid-5">
            {Object.entries(recommendation.five_cs_breakdown).map(([key, value]) => (
              <div key={key} className="metric-card">
                <div className="metric-value" style={{ fontSize: '2rem' }}>
                  {Math.round(value)}
                </div>
                <div className="metric-label" style={{ textTransform: 'capitalize' }}>
                  {key}
                </div>
              </div>
            ))}
          </div>

          {/* Risk Factors & Strengths */}
          <div className="grid grid-2" style={{ marginTop: '2rem' }}>
            <div>
              <h3 style={{ color: '#f87171', marginBottom: '1rem', fontWeight: '700' }}>⚠️ Risk Factors</h3>
              {recommendation.risk_factors && recommendation.risk_factors.length > 0 ? (
                recommendation.risk_factors.map((risk, index) => (
                  <div key={index} className="alert alert-error" style={{ marginBottom: '0.5rem' }}>
                    {risk}
                  </div>
                ))
              ) : (
                <p style={{ color: '#94a3b8' }}>No significant risk factors identified</p>
              )}
            </div>

            <div>
              <h3 style={{ color: '#6ee7b7', marginBottom: '1rem', fontWeight: '700' }}>✅ Strengths</h3>
              {recommendation.strengths && recommendation.strengths.length > 0 ? (
                recommendation.strengths.map((strength, index) => (
                  <div key={index} className="alert alert-success" style={{ marginBottom: '0.5rem' }}>
                    {strength}
                  </div>
                ))
              ) : (
                <p style={{ color: '#94a3b8' }}>No significant strengths identified</p>
              )}
            </div>
          </div>

          {/* Explanation */}
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '15px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
            <h3 style={{ color: '#a5b4fc', marginBottom: '1rem', fontWeight: '700' }}>📝 Detailed Explanation</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#cbd5e1', lineHeight: '1.6' }}>
              {recommendation.explanation}
            </pre>
          </div>

          {/* Actions */}
          <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn" onClick={downloadReport}>
              📥 Download Report
            </button>
            <button className="btn" onClick={() => navigate('/new-application')}>
              🔄 New Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
