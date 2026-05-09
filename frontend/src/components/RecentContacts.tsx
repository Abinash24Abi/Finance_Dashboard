// src/components/RecentContacts.tsx

import React from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../app/store';

const RecentContacts: React.FC = () => {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div className="d-flex gap-3 mt-4 overflow-auto">
      {[user?.name || 'User'].map((item, index) => (
        <div
          key={index}
          className="text-center"
        >
          <img
            src={`https://i.pravatar.cc/60?img=${index}`}
            className="rounded-circle"
            style={{
              width: '55px',
              height: '55px',
              objectFit: 'cover',
            }}
            alt={item}
          />

          <small className="d-block mt-2">
            {item}
          </small>
        </div>
      ))}
    </div>
  );
};

export default RecentContacts;