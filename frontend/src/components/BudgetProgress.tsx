// src/components/BudgetProgress.tsx
import React from 'react';

const BudgetProgress: React.FC = () => {
  const budgets = [
    { category: 'Shopping', spent: 850, limit: 1200, color: '#18c37e' },
    { category: 'Food & Dining', spent: 720, limit: 800, color: '#ffb84d' },
    { category: 'Entertainment', spent: 380, limit: 400, color: '#9b59b6' },
    { category: 'Transport', spent: 250, limit: 300, color: '#ff6b6b' },
  ];

  return (
    <div className="bg-white rounded-4 p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Budget Progress</h5>
        <button className="btn btn-sm btn-light">Manage Budget</button>
      </div>
      
      {budgets.map((budget, idx) => {
        const percentage = (budget.spent / budget.limit) * 100;
        const isOverBudget = percentage > 90;
        
        return (
          <div key={idx} className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-medium">{budget.category}</span>
              <span className={`${isOverBudget ? 'text-danger' : 'text-secondary'}`}>
                £{budget.spent} / £{budget.limit}
              </span>
            </div>
            <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${Math.min(percentage, 100)}%`, 
                  background: isOverBudget ? '#ff6b6b' : budget.color,
                  borderRadius: '10px'
                }}
              ></div>
            </div>
            {isOverBudget && (
              <small className="text-danger mt-1 d-block">⚠️ Approaching budget limit</small>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BudgetProgress;