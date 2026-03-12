import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = {
  processApplication: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/analyze`, {
        company_info: {
          company_name: formData.companyName,
          sector: formData.sector,
          incorporation_year: parseInt(formData.incorporationYear) || 2020,
          promoters: formData.promoters ? formData.promoters.split(',').map(p => p.trim()) : []
        },
        data_sources: {
          financials_manual: {
            revenue: parseFloat(formData.revenue),
            ebitda: parseFloat(formData.ebitda),
            net_profit: parseFloat(formData.netProfit),
            total_debt: parseFloat(formData.totalDebt),
            net_worth: parseFloat(formData.netWorth),
            debt_to_ebitda: parseFloat(formData.totalDebt) / parseFloat(formData.ebitda),
            debt_to_equity: parseFloat(formData.totalDebt) / parseFloat(formData.netWorth)
          },
          gst: {
            total_turnover: parseFloat(formData.gstTurnover),
            gstr3b_vs_gstr2a_mismatch: false,
            filing_frequency: []
          },
          bank: {
            average_balance: 50,
            total_credits: 1000,
            total_debits: 900,
            bounce_rate: 0.01,
            circular_trading_detected: false,
            num_transactions: 100
          },
          mca: {
            director_changes: 0,
            charges: [],
            compliance_status: 'Active',
            authorized_capital: 100,
            paid_up_capital: 75
          }
        },
        primary_insights: {
          capacity_utilization: parseInt(formData.capacityUtilization),
          management_quality_score: parseInt(formData.managementQuality),
          site_visit_score: parseInt(formData.siteVisitScore),
          site_visit_notes: 'Good factory',
          management_interview_notes: 'Competent management'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  processApplicationWithFiles: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/analyze-files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export default api;
