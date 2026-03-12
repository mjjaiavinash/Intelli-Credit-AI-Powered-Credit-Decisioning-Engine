import re
import pdfplumber
import PyPDF2
from pathlib import Path
from typing import Dict, List, Any, Optional
import pandas as pd
from loguru import logger
import json

class DataIngestor:
    """Handles ingestion of structured and unstructured data from multiple sources"""
    
    def __init__(self):
        self.extracted_data = {}
        
    def ingest_pdf(self, pdf_path: str) -> Dict[str, Any]:
        """Extract text and tables from PDF documents"""
        try:
            with pdfplumber.open(pdf_path) as pdf:
                text = ""
                tables = []
                
                for page in pdf.pages:
                    text += page.extract_text() or ""
                    page_tables = page.extract_tables()
                    if page_tables:
                        tables.extend(page_tables)
                
                return {
                    "text": text,
                    "tables": tables,
                    "num_pages": len(pdf.pages),
                    "source": pdf_path
                }
        except Exception as e:
            logger.error(f"Error processing PDF {pdf_path}: {e}")
            return {"error": str(e)}
    
    def parse_gst_returns(self, gst_data: Dict) -> Dict[str, Any]:
        """Parse GST returns and extract key metrics"""
        try:
            parsed = {
                "gstin": gst_data.get("gstin"),
                "total_turnover": 0,
                "input_tax_credit": 0,
                "tax_liability": 0,
                "filing_frequency": [],
                "gstr3b_vs_gstr2a_mismatch": False
            }
            
            # Extract turnover from GSTR-3B
            if "gstr3b" in gst_data:
                for filing in gst_data["gstr3b"]:
                    parsed["total_turnover"] += filing.get("total_turnover", 0)
                    parsed["tax_liability"] += filing.get("tax_liability", 0)
                    parsed["filing_frequency"].append(filing.get("period"))
            
            # Cross-check with GSTR-2A
            if "gstr2a" in gst_data:
                gstr2a_itc = sum(f.get("itc_available", 0) for f in gst_data["gstr2a"])
                gstr3b_itc = sum(f.get("itc_claimed", 0) for f in gst_data.get("gstr3b", []))
                
                if abs(gstr2a_itc - gstr3b_itc) / max(gstr2a_itc, 1) > 0.1:
                    parsed["gstr3b_vs_gstr2a_mismatch"] = True
                    parsed["mismatch_amount"] = abs(gstr2a_itc - gstr3b_itc)
            
            return parsed
        except Exception as e:
            logger.error(f"Error parsing GST data: {e}")
            return {"error": str(e)}
    
    def parse_bank_statements(self, bank_file: str) -> Dict[str, Any]:
        """Parse bank statements and extract transaction patterns"""
        try:
            df = pd.read_csv(bank_file) if bank_file.endswith('.csv') else pd.read_excel(bank_file)
            
            # Standardize column names
            df.columns = df.columns.str.lower().str.strip()
            
            # Calculate key metrics
            total_credits = df[df['amount'] > 0]['amount'].sum() if 'amount' in df.columns else 0
            total_debits = abs(df[df['amount'] < 0]['amount'].sum()) if 'amount' in df.columns else 0
            avg_balance = df['balance'].mean() if 'balance' in df.columns else 0
            
            # Detect circular trading patterns
            circular_trading_risk = self._detect_circular_trading(df)
            
            return {
                "total_credits": total_credits,
                "total_debits": total_debits,
                "average_balance": avg_balance,
                "num_transactions": len(df),
                "circular_trading_detected": circular_trading_risk,
                "bounce_rate": self._calculate_bounce_rate(df)
            }
        except Exception as e:
            logger.error(f"Error parsing bank statement: {e}")
            return {"error": str(e)}
    
    def _detect_circular_trading(self, df: pd.DataFrame) -> bool:
        """Detect potential circular trading patterns"""
        if 'description' not in df.columns or 'amount' in df.columns:
            return False
        
        # Look for same amounts being credited and debited within short time
        amounts = df['amount'].value_counts()
        suspicious_amounts = amounts[amounts > 3]
        
        return len(suspicious_amounts) > 5
    
    def _calculate_bounce_rate(self, df: pd.DataFrame) -> float:
        """Calculate cheque/payment bounce rate"""
        if 'description' not in df.columns:
            return 0.0
        
        bounce_keywords = ['bounce', 'return', 'dishonour', 'insufficient']
        bounces = df['description'].str.lower().str.contains('|'.join(bounce_keywords), na=False).sum()
        
        return bounces / len(df) if len(df) > 0 else 0.0
    
    def parse_financial_statements(self, pdf_path: str) -> Dict[str, Any]:
        """Extract key financial ratios from annual reports"""
        pdf_data = self.ingest_pdf(pdf_path)
        text = pdf_data.get("text", "")
        
        # Extract key financial metrics using regex
        metrics = {
            "revenue": self._extract_metric(text, r"(?:revenue|turnover|sales).*?(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:cr|crore|lakh|million)", "revenue"),
            "ebitda": self._extract_metric(text, r"ebitda.*?(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:cr|crore|lakh)", "ebitda"),
            "net_profit": self._extract_metric(text, r"(?:net profit|pat).*?(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:cr|crore|lakh)", "profit"),
            "total_debt": self._extract_metric(text, r"(?:total debt|borrowings).*?(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:cr|crore|lakh)", "debt"),
            "net_worth": self._extract_metric(text, r"(?:net worth|shareholders.?equity).*?(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:cr|crore|lakh)", "networth"),
        }
        
        # Calculate ratios
        if metrics["total_debt"] and metrics["ebitda"]:
            metrics["debt_to_ebitda"] = metrics["total_debt"] / max(metrics["ebitda"], 1)
        
        if metrics["total_debt"] and metrics["net_worth"]:
            metrics["debt_to_equity"] = metrics["total_debt"] / max(metrics["net_worth"], 1)
        
        return metrics
    
    def _extract_metric(self, text: str, pattern: str, metric_name: str) -> Optional[float]:
        """Extract numerical metrics from text using regex"""
        try:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                value_str = match.group(1).replace(',', '')
                return float(value_str)
        except Exception as e:
            logger.debug(f"Could not extract {metric_name}: {e}")
        return None
    
    def parse_mca_filings(self, mca_data: Dict) -> Dict[str, Any]:
        """Parse MCA filings for corporate governance signals"""
        director_changes = mca_data.get("director_changes", [])
        charges = mca_data.get("charges", [])
        
        return {
            "director_changes": len(director_changes) if isinstance(director_changes, list) else director_changes,
            "charge_modifications": len(charges) if isinstance(charges, list) else charges,
            "compliance_status": mca_data.get("compliance_status", "Unknown"),
            "last_agm_date": mca_data.get("last_agm_date"),
            "authorized_capital": mca_data.get("authorized_capital", 0),
            "paid_up_capital": mca_data.get("paid_up_capital", 0)
        }
    
    def ingest_all(self, data_sources: Dict[str, str]) -> Dict[str, Any]:
        """Orchestrate ingestion from all data sources"""
        results = {}
        
        # Handle manual financial entry
        if "financials_manual" in data_sources:
            results["financials"] = data_sources["financials_manual"]
        elif "financial_statements" in data_sources:
            results["financials"] = self.parse_financial_statements(data_sources["financial_statements"])
        
        if "gst" in data_sources:
            results["gst"] = self.parse_gst_returns(data_sources["gst"])
        
        if "bank_statement" in data_sources:
            results["bank"] = self.parse_bank_statements(data_sources["bank_statement"])
        elif "bank" in data_sources:
            results["bank"] = data_sources["bank"]
        
        if "mca" in data_sources:
            results["mca"] = self.parse_mca_filings(data_sources["mca"])
        
        self.extracted_data = results
        return results
