// src/components/GoalTracker.tsx
import React from 'react';

const GoalTracker: React.FC = () => {
  const goals = [
    { name: 'Emergency Fund', saved: 8500, target: 10000, icon: 'bi-shield-shaded', color: '#3498db' },
    { name: 'Vacation Trip', saved: 3200, target: 5000, icon: 'bi-airplane', color: '#e74c3c' },
    { name: 'New Phone', saved: 650, target: 1200, icon: 'bi-phone', color: '#f39c12' },
  ];

  return (
    <div className="bg-white rounded-4 p-4 shadow-sm h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Savings Goals</h5>
        <button className="btn btn-sm btn-success">+ New Goal</button>
      </div>
      
      {goals.map((goal, idx) => {
        const percentage = (goal.saved / goal.target) * 100;
        
        return (
          <div key={idx} className={idx !== goals.length - 1 ? 'mb-4' : ''}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', background: `${goal.color}20` }}>
                  <i className={`bi ${goal.icon}`} style={{ color: goal.color }}></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">{goal.name}</h6>
                  <small className="text-secondary">£{goal.saved.toLocaleString()} saved</small>
                </div>
              </div>
              <span className="fw-bold">{Math.round(percentage)}%</span>
            </div>
            <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
              <div className="progress-bar" style={{ width: `${percentage}%`, background: goal.color, borderRadius: '10px' }}></div>
            </div>
            <div className="mt-2 text-end">
              <small className="text-secondary">Need £{(goal.target - goal.saved).toLocaleString()} more</small>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GoalTracker;