// src/components/CurrencyConverter.tsx
import React, { useState } from 'react';

interface CurrencyConverterProps {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ selectedCurrency, setSelectedCurrency }) => {
  const [amount, setAmount] = useState(100);
  
  const rates = {
    USD: { symbol: '$', rate: 1.34, flag: '🇺🇸', name: 'US Dollar' },
    EUR: { symbol: '€', rate: 1.22, flag: '🇪🇺', name: 'Euro' },
    IDR: { symbol: 'Rp', rate: 20223, flag: '🇮🇩', name: 'Rupiah' },
    JPY: { symbol: '¥', rate: 198.5, flag: '🇯🇵', name: 'Yen' },
  };

  const convertedAmount = (amount * rates[selectedCurrency as keyof typeof rates]?.rate).toLocaleString();

  return (
    <div className="mt-3">
      <div className="row g-2 mb-3">
        {Object.entries(rates).map(([code, data]) => (
          <div key={code} className="col-6">
            <div 
              className={`bg-light rounded-4 p-3 cursor-pointer ${selectedCurrency === code ? 'border border-success' : ''}`}
              onClick={() => setSelectedCurrency(code)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div className="fs-2">{data.flag}</div>
                {selectedCurrency === code && <i className="bi bi-check-circle text-success"></i>}
              </div>
              <h4 className="fw-bold mt-3 mb-0">{data.symbol}{data.rate.toLocaleString()}</h4>
              <small className="text-secondary">{data.name}</small>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-light rounded-4 p-3">
        <label className="text-secondary small">Amount in GBP</label>
        <div className="d-flex align-items-center gap-2">
          <span className="fs-4">£</span>
          <input 
            type="number" 
            className="form-control form-control-lg border-0 bg-transparent fw-bold ps-0" 
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{ fontSize: '24px' }}
          />
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <span>Converted Amount</span>
          <strong className="fs-5">{rates[selectedCurrency as keyof typeof rates]?.symbol} {convertedAmount}</strong>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;