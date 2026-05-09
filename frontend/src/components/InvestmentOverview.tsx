// src/components/InvestmentOverview.tsx
import React from 'react';

interface InvestmentOverviewProps {
  investmentReturns: number;
}

const InvestmentOverview: React.FC<InvestmentOverviewProps> = ({ investmentReturns }) => {
  const investments = [
    { name: 'Stocks', value: 12500, change: 8.5, icon: 'bi-graph-up' },
    { name: 'Crypto', value: 8450, change: -3.2, icon: 'bi-currency-bitcoin' },
    { name: 'Bonds', value: 5000, change: 2.1, icon: 'bi-pie-chart' },
    { name: 'Real Estate', value: 25000, change: 5.7, icon: 'bi-building' },
  ];

  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);

  return (
    <div className="bg-white rounded-4 p-4 shadow-sm h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Investment Portfolio</h5>
        <span className={`badge ${investmentReturns >= 0 ? 'bg-success' : 'bg-danger'} px-3 py-2`}>
          {investmentReturns >= 0 ? '+' : ''}{investmentReturns}% ROI
        </span>
      </div>
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <small className="text-secondary">Total Value</small>
        <h4 className="fw-bold">£{totalValue.toLocaleString()}</h4>
      </div>
      
      {investments.map((inv, idx) => (
        <div key={idx} className="d-flex justify-content-between align-items-center py-2 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <div className={`rounded-circle p-2 ${inv.change >= 0 ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
              <i className={`bi ${inv.icon} ${inv.change >= 0 ? 'text-success' : 'text-danger'}`}></i>
            </div>
            <div>
              <div className="fw-medium">{inv.name}</div>
              <small className="text-secondary">£{inv.value.toLocaleString()}</small>
            </div>
          </div>
          <span className={`fw-semibold ${inv.change >= 0 ? 'text-success' : 'text-danger'}`}>
            {inv.change >= 0 ? '+' : ''}{inv.change}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default InvestmentOverview;