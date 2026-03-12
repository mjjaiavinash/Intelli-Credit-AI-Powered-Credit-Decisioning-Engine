// Default sample data for Intelli-Credit
export const defaultApplications = [
  // 10 Approved Applications
  {
    company_name: "Tech Innovations Pvt Ltd",
    credit_score: 825,
    rating: "AAA",
    decision: "APPROVED",
    recommended_loan_amount: 15.50,
    recommended_interest_rate: 8.5,
    five_cs_breakdown: {
      character: 92,
      capacity: 88,
      capital: 85,
      collateral: 80,
      conditions: 90
    },
    risk_factors: ["Market volatility in tech sector"],
    strengths: ["Strong cash flow", "Excellent management team", "Growing market share"],
    timestamp: Date.now() - 86400000 * 1
  },
  {
    company_name: "Green Energy Solutions Ltd",
    credit_score: 780,
    rating: "AA",
    decision: "APPROVED",
    recommended_loan_amount: 12.25,
    recommended_interest_rate: 9.0,
    five_cs_breakdown: {
      character: 88,
      capacity: 82,
      capital: 78,
      collateral: 75,
      conditions: 85
    },
    risk_factors: ["Regulatory changes in renewable sector"],
    strengths: ["Government subsidies", "Growing demand", "Experienced promoters"],
    timestamp: Date.now() - 86400000 * 2
  },
  {
    company_name: "Manufacturing Excellence Corp",
    credit_score: 755,
    rating: "AA",
    decision: "APPROVED",
    recommended_loan_amount: 20.00,
    recommended_interest_rate: 9.25,
    five_cs_breakdown: {
      character: 85,
      capacity: 80,
      capital: 75,
      collateral: 78,
      conditions: 82
    },
    risk_factors: ["Raw material price fluctuations"],
    strengths: ["Established client base", "Modern infrastructure", "Export potential"],
    timestamp: Date.now() - 86400000 * 3
  },
  {
    company_name: "Healthcare Services India Ltd",
    credit_score: 810,
    rating: "AAA",
    decision: "APPROVED",
    recommended_loan_amount: 18.75,
    recommended_interest_rate: 8.75,
    five_cs_breakdown: {
      character: 90,
      capacity: 86,
      capital: 82,
      collateral: 85,
      conditions: 88
    },
    risk_factors: ["Insurance reimbursement delays"],
    strengths: ["Essential service provider", "Multiple revenue streams", "Strong brand"],
    timestamp: Date.now() - 86400000 * 4
  },
  {
    company_name: "Logistics & Transport Co",
    credit_score: 720,
    rating: "A",
    decision: "APPROVED",
    recommended_loan_amount: 10.50,
    recommended_interest_rate: 9.75,
    five_cs_breakdown: {
      character: 80,
      capacity: 75,
      capital: 72,
      collateral: 70,
      conditions: 78
    },
    risk_factors: ["Fuel price volatility", "Competition from new players"],
    strengths: ["Pan-India network", "Long-term contracts", "Fleet ownership"],
    timestamp: Date.now() - 86400000 * 5
  },
  {
    company_name: "Food Processing Industries Ltd",
    credit_score: 795,
    rating: "AA",
    decision: "APPROVED",
    recommended_loan_amount: 14.00,
    recommended_interest_rate: 8.85,
    five_cs_breakdown: {
      character: 87,
      capacity: 84,
      capital: 80,
      collateral: 82,
      conditions: 86
    },
    risk_factors: ["Seasonal demand variations"],
    strengths: ["FSSAI certified", "Export licenses", "Brand recognition"],
    timestamp: Date.now() - 86400000 * 6
  },
  {
    company_name: "Textile Exports International",
    credit_score: 740,
    rating: "A",
    decision: "APPROVED",
    recommended_loan_amount: 11.25,
    recommended_interest_rate: 9.50,
    five_cs_breakdown: {
      character: 82,
      capacity: 78,
      capital: 74,
      collateral: 76,
      conditions: 80
    },
    risk_factors: ["Currency fluctuation risk", "International trade policies"],
    strengths: ["Established export markets", "Quality certifications", "Skilled workforce"],
    timestamp: Date.now() - 86400000 * 7
  },
  {
    company_name: "Pharma Research Labs Pvt Ltd",
    credit_score: 805,
    rating: "AAA",
    decision: "APPROVED",
    recommended_loan_amount: 22.50,
    recommended_interest_rate: 8.60,
    five_cs_breakdown: {
      character: 89,
      capacity: 85,
      capital: 81,
      collateral: 84,
      conditions: 87
    },
    risk_factors: ["Regulatory approval timelines"],
    strengths: ["Patent portfolio", "R&D capabilities", "WHO-GMP certified"],
    timestamp: Date.now() - 86400000 * 8
  },
  {
    company_name: "Real Estate Developers Ltd",
    credit_score: 710,
    rating: "A",
    decision: "APPROVED",
    recommended_loan_amount: 25.00,
    recommended_interest_rate: 10.00,
    five_cs_breakdown: {
      character: 78,
      capacity: 74,
      capital: 71,
      collateral: 85,
      conditions: 75
    },
    risk_factors: ["Market slowdown", "Regulatory compliance"],
    strengths: ["Prime land bank", "RERA registered", "Track record of delivery"],
    timestamp: Date.now() - 86400000 * 9
  },
  {
    company_name: "Agro Products & Exports",
    credit_score: 765,
    rating: "AA",
    decision: "APPROVED",
    recommended_loan_amount: 9.75,
    recommended_interest_rate: 9.15,
    five_cs_breakdown: {
      character: 84,
      capacity: 80,
      capital: 77,
      collateral: 73,
      conditions: 83
    },
    risk_factors: ["Weather dependency", "Price volatility"],
    strengths: ["Contract farming network", "Cold storage facilities", "Export tie-ups"],
    timestamp: Date.now() - 86400000 * 10
  },
  
  // 10 Rejected Applications
  {
    company_name: "Struggling Retail Chain Ltd",
    credit_score: 485,
    rating: "C",
    decision: "REJECTED",
    recommended_loan_amount: 0,
    recommended_interest_rate: 0,
    five_cs_breakdown: {
      character: 45,
      capacity: 40,
      capital: 38,
      collateral: 42,
      conditions: 48
    },
    risk_factors: ["Declining sales", "High debt burden", "Negative cash flow", "Store closures"],
    strengths: ["Brand recognition"],
    timestamp: Date.now() - 86400000 * 11
  },
  {
    company_name: "Outdated Manufacturing Co",
    credit_score: 520,
    rating: "C",
    decision: "REJECTED",
    recommended_loan_amount: 0,
    recommended_interest_rate: 0,
    five_cs_breakdown: {
      character: 50,
      capacity: 45,
      capital: 42,
      collateral: 48,
      conditions: 52
    },
    risk_factors: ["Obsolete technology", "Loss of major clients", "Working capital shortage"],
    strengths: ["Experienced workforce"],
    timestamp: Date.now() - 86400000 * 12
  },
  {
    company_name: "Debt-Ridden Textiles Ltd",
    credit_score: 445,
    rating: "C",
    decision: "REJECTED",
    recommended_loan_amount: 0,
    recommended_interest_rate: 0,
    five_cs_breakdown: {
      character: 42,
      capacity: 38,
      capital: 35,
      collateral: 40,
      conditions: 44
    },
    risk_factors: ["Multiple loan defaults", "Legal disputes", "Poor management", "Declining orders"],
    strengths: ["Factory infrastructure"],
    timestamp: Date.now() - 86400000 * 13
  },
  {
    company_name: "Unprofitable Tech Startup",
    credit_score: 565,
    rating: "B",
    decision: "REJECTED",
    recommended_loan_amount: 0,
    recommended_interest_rate: 0,
    five_cs_breakdown: {
      character: 55,
      capacity: 52,
      capital: 48,
      collateral: 50,
      conditions: 58
    },
    risk_factors: ["No profitability path", "High burn rate", "Limited market traction"],
    strengths: ["Innovative product", "Young team"],
    timestamp: Date.now() - 86400000 * 14
  },
  {
    company_name: "Failing Restaurant Chain",
    credit_score: 510,
    rating: "C",
    decision: "REJECTED",
    recommended_loan_amount: 0,
    recommended_interest_rate: 0,
    five_cs_breakdown: {
      character: 48,
      capacity: 44,
      capital: 40,
      collateral: 46,
      conditions: 50
    },
    risk_factors: ["Consistent losses", "High employee turnover", "Food safety violations"],
    strengths: ["Prime locations"],
    timestamp: Date.now() - 86400000 * 15
  },
  {
    company_name: "Troubled Construction Ltd",
    credit_score: 475,
    rating: "C",
    decision: "REJECTED",
    recommended_loan_amount: 0,
    recommended_interest_rate: 0,
    five_cs_breakdown: {
      character: 44,
      capacity: 42,
      capital: 38,
      collateral: 45,
      conditions: 46
    },
    risk_factors: ["Project delays", "Cost overruns", "Client disputes", "Contractor issues"],
    strengths: ["Equipment ownership"],
    timestamp: Date.now() - 86400000 * 16
  },
  {
    company_name: "Bankrupt Trading Company",
    credit_score: 420,
    rating: "C",
    decision: "REJECTED",
    recommended_loan_amount: 0,
    recommended_interest_rate: 0,
    five_cs_breakdown: {
      character: 38,
      capacity: 35,
      capital: 32,
      collateral: 36,
      conditions: 40
    },
    risk_factors: ["Insolvency proceedings", "Asset seizures", "Fraud allegations", "No operations"],
    strengths: ["None identified"],
    timestamp: Date.now() - 86400000 * 17
  },
  {
    company_name: "Loss-Making NBFC",
    credit_score: 540,
    rating: "B",
    decision: "REJECTED",
    recommended_loan_amount: 0,
    recommended_interest_rate: 0,
    five_cs_breakdown: {
      character: 52,
      capacity: 48,
      capital: 45,
      collateral: 50,
      conditions: 54
    },
    risk_factors: ["Rising NPAs", "Liquidity crisis", "Regulatory scrutiny", "Credit rating downgrade"],
    strengths: ["RBI registration"],
    timestamp: Date.now() - 86400000 * 18
  },
  {
    company_name: "Defunct IT Services Co",
    credit_score: 495,
    rating: "C",
    decision: "REJECTED",
    recommended_loan_amount: 0,
    recommended_interest_rate: 0,
    five_cs_breakdown: {
      character: 46,
      capacity: 43,
      capital: 40,
      collateral: 44,
      conditions: 48
    },
    risk_factors: ["Client concentration risk", "Talent attrition", "Outdated skills", "No new projects"],
    strengths: ["Office space"],
    timestamp: Date.now() - 86400000 * 19
  },
  {
    company_name: "Insolvent Logistics Firm",
    credit_score: 460,
    rating: "C",
    decision: "REJECTED",
    recommended_loan_amount: 0,
    recommended_interest_rate: 0,
    five_cs_breakdown: {
      character: 43,
      capacity: 40,
      capital: 36,
      collateral: 42,
      conditions: 45
    },
    risk_factors: ["Fleet repossession", "License cancellations", "Unpaid dues", "Operations halted"],
    strengths: ["Warehouse lease"],
    timestamp: Date.now() - 86400000 * 20
  }
];

export const initializeDefaultData = () => {
  const existingHistory = localStorage.getItem('applicationHistory');
  
  if (!existingHistory || JSON.parse(existingHistory).length === 0) {
    localStorage.setItem('applicationHistory', JSON.stringify(defaultApplications));
    return true;
  }
  
  return false;
};
