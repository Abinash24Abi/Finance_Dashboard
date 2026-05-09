// src/components/UpcomingBills.tsx
import React from 'react';

interface UpcomingBillsProps {
  payments: any[];
}

const UpcomingBills: React.FC<UpcomingBillsProps> = ({ payments }) => {
  const getDaysLeft = (dateStr: string) => {
    // Simplified - in real app, parse actual due date
    return Math.floor(Math.random() * 30) + 1;
  };

  const getStatusColor = (daysLeft: number) => {
    if (daysLeft <= 3) return 'danger';
    if (daysLeft <= 7) return 'warning';
    return 'success';
  };

  return (
    <>
      {payments.slice(0, 4).map((item: any, index) => {
        const daysLeft = getDaysLeft(item.dueDate);
        const statusColor = getStatusColor(daysLeft);
        
        return (
          <div key={index} className="border-bottom py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3 align-items-center">
              <div className={`rounded-circle bg-${statusColor} bg-opacity-10 p-2`}>
                <i className={`bi bi-calendar-${statusColor === 'danger' ? 'exclamation' : 'check'} text-${statusColor}`}></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">{item.title}</h6>
                <small className="text-secondary">{item.category || 'Bills'} • {daysLeft} days left</small>
              </div>
            </div>
            <div className="text-end">
              <h6 className="fw-bold mb-0">{item.amount}</h6>
              <small className={`text-${statusColor}`}>
                {daysLeft <= 3 ? 'Due soon!' : `in ${daysLeft} days`}
              </small>
            </div>
          </div>
        );
      })}
      
      {payments.length === 0 && (
        <div className="text-center py-4">
          <i className="bi bi-check-circle fs-1 text-success opacity-50"></i>
          <p className="text-secondary mt-2">No bills due this week!</p>
        </div>
      )}
    </>
  );
};

export default UpcomingBills;