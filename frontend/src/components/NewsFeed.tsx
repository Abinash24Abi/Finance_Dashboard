// src/components/NewsFeed.tsx
import React, { useState, useEffect } from 'react';

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState([
    { title: 'Federal Reserve signals rate cut in September', source: 'Financial Times', time: '2 hours ago' },
    { title: 'Tech stocks rally as AI demand surges', source: 'Bloomberg', time: '4 hours ago' },
    { title: 'Global markets react to oil price changes', source: 'Reuters', time: '6 hours ago' },
  ]);

  return (
    <div className="bg-white rounded-4 p-4 shadow-sm h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Financial News</h5>
        <i className="bi bi-newspaper text-secondary"></i>
      </div>
      
      <div className="d-flex flex-column gap-3">
        {articles.map((article, idx) => (
          <div key={idx} className="d-flex gap-3 align-items-start pb-3 border-bottom">
            <div className="flex-shrink-0">
              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-file-text text-secondary"></i>
              </div>
            </div>
            <div>
              <p className="fw-semibold mb-1" style={{ fontSize: '14px', lineHeight: '1.4' }}>{article.title}</p>
              <div className="d-flex gap-2 align-items-center">
                <small className="text-secondary">{article.source}</small>
                <small className="text-muted">•</small>
                <small className="text-secondary">{article.time}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="btn btn-outline-secondary btn-sm w-100 mt-3 rounded-pill">
        View More News <i className="bi bi-arrow-right ms-1"></i>
      </button>
    </div>
  );
};

export default NewsFeed;