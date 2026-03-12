"""
Test script for Intelli-Credit Engine
Demonstrates end-to-end credit appraisal process
"""

import sys
sys.path.append('./src')

from main import IntelliCreditEngine
import json
from pathlib import Path

def load_sample_data():
    """Load sample data files"""
    
    # Load GST data
    with open('data/sample_data/sample_gst.json', 'r') as f:
        gst_data = json.load(f)
    
    # Load MCA data
    with open('data/sample_data/sample_mca.json', 'r') as f:
        mca_data = json.load(f)
    
    return gst_data, mca_data

def test_basic_appraisal():
    """Test basic credit appraisal"""
    
    print("="*70)
    print("INTELLI-CREDIT ENGINE - TEST RUN")
    print("="*70)
    print()
    
    # Initialize engine
    print("Initializing Intelli-Credit Engine...")
    engine = IntelliCreditEngine()
    print("✓ Engine initialized\n")
    
    # Load sample data
    print("Loading sample data...")
    gst_data, mca_data = load_sample_data()
    print("✓ Sample data loaded\n")
    
    # Company information
    company_info = {
        'company_name': 'ABC Manufacturing Pvt Ltd',
        'sector': 'Manufacturing',
        'cin': 'U12345MH2015PTC123456',
        'incorporation_year': 2015,
        'promoters': ['Mr. Rajesh Kumar', 'Mrs. Priya Sharma', 'Mr. Amit Verma']
    }
    
    # Data sources
    data_sources = {
        'gst': gst_data,
        'bank_statement': 'data/sample_data/sample_bank_statement.csv',
        'mca': mca_data
    }
    
    # Add manual financial data (simulating PDF extraction)
    data_sources['financials_manual'] = {
        'revenue': 650.5,  # in Crores
        'ebitda': 97.58,
        'net_profit': 52.04,
        'total_debt': 195.12,
        'net_worth': 325.25,
        'debt_to_ebitda': 2.0,
        'debt_to_equity': 0.6
    }
    
    # Primary insights from site visit
    primary_insights = {
        'capacity_utilization': 78,
        'management_quality_score': 8,
        'site_visit_score': 8,
        'site_visit_notes': '''
Site Visit Observations (Date: 15-Jan-2024):
- Factory located in MIDC industrial area, well-maintained premises
- Modern CNC machines and automated production lines observed
- Good housekeeping and safety protocols in place
- Capacity utilization appears healthy at ~75-80%
- Inventory management seems organized
- Worker morale appears good
- No signs of distress or underutilization
        '''.strip(),
        'management_interview_notes': '''
Management Interview Notes:
- Met with Mr. Rajesh Kumar (MD) and CFO
- Management appears competent and transparent
- Clear understanding of business and market dynamics
- Provided detailed explanations of financial performance
- Growth strategy focused on capacity expansion and new product lines
- No red flags in terms of evasiveness or inconsistencies
- Good knowledge of industry trends and competition
        '''.strip()
    }
    
    print("Processing credit application...")
    print(f"Company: {company_info['company_name']}")
    print(f"Sector: {company_info['sector']}")
    print()
    
    # Process application
    try:
        results = engine.process_credit_application(
            company_info=company_info,
            data_sources=data_sources,
            primary_insights=primary_insights
        )
        
        print("\n" + "="*70)
        print("CREDIT APPRAISAL RESULTS")
        print("="*70)
        
        recommendation = results['recommendation']
        
        # Decision
        print(f"\n{'DECISION:':<25} {recommendation['decision']}")
        print(f"{'Credit Score:':<25} {recommendation['credit_score']}")
        print(f"{'Rating:':<25} {recommendation['rating']}")
        
        if recommendation['decision'] == 'APPROVED':
            print(f"{'Recommended Loan Amount:':<25} ₹ {recommendation['recommended_loan_amount']:.2f} Crores")
            print(f"{'Recommended Interest Rate:':<25} {recommendation['recommended_interest_rate']:.2f}% p.a.")
        
        # Five Cs Breakdown
        print("\n" + "-"*70)
        print("FIVE Cs OF CREDIT ANALYSIS")
        print("-"*70)
        
        five_cs = recommendation['five_cs_breakdown']
        print(f"{'Character:':<25} {five_cs['character']}/100")
        print(f"{'Capacity:':<25} {five_cs['capacity']}/100")
        print(f"{'Capital:':<25} {five_cs['capital']}/100")
        print(f"{'Collateral:':<25} {five_cs['collateral']}/100")
        print(f"{'Conditions:':<25} {five_cs['conditions']}/100")
        
        # Risk Factors
        if recommendation['risk_factors']:
            print("\n" + "-"*70)
            print("RISK FACTORS")
            print("-"*70)
            for i, risk in enumerate(recommendation['risk_factors'], 1):
                print(f"{i}. {risk}")
        
        # Strengths
        if recommendation['strengths']:
            print("\n" + "-"*70)
            print("STRENGTHS")
            print("-"*70)
            for i, strength in enumerate(recommendation['strengths'], 1):
                print(f"{i}. {strength}")
        
        # Explanation
        print("\n" + "-"*70)
        print("DETAILED EXPLANATION")
        print("-"*70)
        print(recommendation['explanation'])
        
        # CAM Document
        print("\n" + "-"*70)
        print("GENERATED DOCUMENTS")
        print("-"*70)
        print(f"CAM Document: {results['cam_document_path']}")
        print(f"Results JSON: {results['cam_document_path'].replace('.docx', '_results.json')}")
        
        print("\n" + "="*70)
        print("TEST COMPLETED SUCCESSFULLY")
        print("="*70)
        
        return results
        
    except Exception as e:
        print(f"\n❌ Error during processing: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

def test_quick_score():
    """Test quick credit score calculation"""
    
    print("\n" + "="*70)
    print("QUICK CREDIT SCORE TEST")
    print("="*70)
    
    engine = IntelliCreditEngine()
    
    company_info = {
        'company_name': 'Quick Test Company',
        'sector': 'Services'
    }
    
    data_sources = {
        'financials_manual': {
            'revenue': 100,
            'ebitda': 15,
            'net_profit': 8,
            'total_debt': 30,
            'net_worth': 50,
            'debt_to_ebitda': 2.0,
            'debt_to_equity': 0.6
        },
        'gst': {
            'total_turnover': 95,
            'gstr3b_vs_gstr2a_mismatch': False,
            'filing_frequency': ['2023-' + str(i).zfill(2) for i in range(1, 13)]
        },
        'bank': {
            'average_balance': 50,
            'total_credits': 1000,
            'total_debits': 900,
            'bounce_rate': 0.01,
            'circular_trading_detected': False,
            'num_transactions': 100
        },
        'mca': {
            'director_changes': 0,
            'charges': [],
            'compliance_status': 'Active',
            'authorized_capital': 100,
            'paid_up_capital': 75
        }
    }
    
    score = engine.quick_score(company_info, data_sources)
    
    print(f"\nQuick Credit Score: {score}")
    print("="*70)

def main():
    """Run all tests"""
    
    # Test 1: Full credit appraisal
    results = test_basic_appraisal()
    
    # Test 2: Quick score
    if results:
        test_quick_score()
    
    print("\n✓ All tests completed!")

if __name__ == "__main__":
    main()
