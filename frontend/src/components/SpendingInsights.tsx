// src/components/SpendingInsights.tsx
import React from 'react';

interface SpendingInsightsProps {
  transactions: any[];
  cards: any[];
}

const SpendingInsights: React.FC<SpendingInsightsProps> = () => {
  const insights = [
    { text: 'Your spending this month is 12% lower than last month', type: 'positive', icon: 'bi-graph-down' },
    { text: 'You saved £245 this week on dining out', type: 'positive', icon: 'bi-emoji-smile' },
    { text: 'Consider reducing entertainment expenses (up 15%)', type: 'warning', icon: 'bi-exclamation-triangle' },
  ];

  return (
    <div className="bg-white rounded-4 p-4 shadow-sm h-100">
      <h5 className="fw-bold mb-4">Spending Insights</h5>
      <div className="d-flex flex-column gap-3">
        {insights.map((insight, idx) => (
          <div key={idx} className={`d-flex align-items-center gap-3 p-3 rounded-4 ${insight.type === 'positive' ? 'bg-success bg-opacity-10' : 'bg-warning bg-opacity-10'}`}>
            <i className={`bi ${insight.icon} fs-4 ${insight.type === 'positive' ? 'text-success' : 'text-warning'}`}></i>
            <p className="mb-0 flex-grow-1">{insight.text}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-top">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-secondary">AI Financial Health Score</span>
          <span className="fw-bold fs-4" style={{ color: '#18c37e' }}>78/100</span>
        </div>
        <div className="progress mt-2" style={{ height: '8px', borderRadius: '10px' }}>
          <div className="progress-bar bg-success" style={{ width: '78%', borderRadius: '10px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;