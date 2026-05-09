// src/components/SpendingChart.tsx
import React from 'react';

interface SpendingChartProps {
  transactions: any[];
  selectedTimeRange: 'week' | 'month' | 'year';
}

const SpendingChart: React.FC<SpendingChartProps> = () => {
  const categories = [
    { name: 'Shopping', amount: 1250, color: '#18c37e', icon: 'bi-bag' },
    { name: 'Food & Dining', amount: 850, color: '#ffb84d', icon: 'bi-egg-fried' },
    { name: 'Transport', amount: 320, color: '#ff6b6b', icon: 'bi-car-front' },
    { name: 'Entertainment', amount: 450, color: '#9b59b6', icon: 'bi-ticket' },
    { name: 'Bills', amount: 350, color: '#3498db', icon: 'bi-receipt' },
  ];

  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="bg-white rounded-4 p-4 shadow-sm h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Spending by Category</h5>
        <small className="text-secondary">Total: £{total.toLocaleString()}</small>
      </div>
      
      <div className="d-flex flex-wrap gap-3">
        {categories.map((category, idx) => (
          <div key={idx} className="d-flex align-items-center gap-2" style={{ minWidth: '120px' }}>
            <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: `${category.color}20` }}>
              <i className={`bi ${category.icon} fs-5`} style={{ color: category.color }}></i>
            </div>
            <div>
              <small className="text-secondary d-block">{category.name}</small>
              <strong>£{category.amount}</strong>
              <div className="progress mt-1" style={{ height: '3px', width: '80px' }}>
                <div className="progress-bar" style={{ width: `${(category.amount / total) * 100}%`, background: category.color }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingChart;