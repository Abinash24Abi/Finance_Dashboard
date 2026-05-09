// src/components/NotificationsDropdown.tsx
import React from 'react';

interface NotificationsDropdownProps {
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ onClose }) => {
  const notifications = [
    { id: 1, title: 'Payment Received', message: 'You received £500 from John Doe', time: '2 mins ago', read: false },
    { id: 2, title: 'Bill Reminder', message: 'Netflix subscription due in 3 days', time: '1 hour ago', read: false },
    { id: 3, title: 'Card Limit Update', message: 'You\'ve reached 80% of your monthly limit', time: '5 hours ago', read: true },
  ];

  return (
    <div className="position-absolute end-0 mt-2 bg-white rounded-4 shadow-lg" style={{ width: '320px', zIndex: 1050, top: '100%' }}>
      <div className="p-3 border-bottom">
        <h6 className="fw-bold mb-0">Notifications</h6>
      </div>
      <div className="list-group list-group-flush">
        {notifications.map(notif => (
          <div key={notif.id} className={`list-group-item list-group-item-action p-3 ${!notif.read ? 'bg-light' : ''}`}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <strong className="d-block">{notif.title}</strong>
                <small className="text-secondary">{notif.message}</small>
                <small className="d-block text-muted mt-1">{notif.time}</small>
              </div>
              {!notif.read && <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 text-center border-top">
        <button className="btn btn-link btn-sm text-decoration-none" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;