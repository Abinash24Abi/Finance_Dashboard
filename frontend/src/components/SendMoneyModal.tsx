import { useState } from 'react';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../app/store';

import { sendMoneyRequest } from '../redux/transfer/transferSlice';

interface Props {
  show: boolean;
  close: () => void;
}

const SendMoneyModal = ({ show, close }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { cards } = useSelector((state: RootState) => state.card); // ✅ YOUR CARDS

  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [receiver, setReceiver] = useState<any>(null);

  const [selectedCard, setSelectedCard] = useState(''); // receiver card
  const [senderCardId, setSenderCardId] = useState(''); // 🔥 FIX ADDED

  const [loading, setLoading] = useState(false);

  // SEARCH USER
  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5000/api/auth/find-user/${email}`,
        { withCredentials: true }
      );

      setReceiver(response.data.user);
      setLoading(false);
    } catch (error) {
      alert('User not found');
      setReceiver(null);
      setLoading(false);
    }
  };

  // SEND MONEY
  const handleSend = () => {
    if (!senderCardId) {
      alert('Please select your card');
      return;
    }

    if (!selectedCard) {
      alert('Please select receiver card');
      return;
    }

    if (!amount) {
      alert('Please enter amount');
      return;
    }

 dispatch(
  sendMoneyRequest({
    senderCardId,
    receiverEmail: receiver?.email,
    receiverCardId: selectedCard,
    amount: Number(amount), // ✅ FIX HERE
    note,
  })
);

    // RESET
    setEmail('');
    setAmount('');
    setNote('');
    setReceiver(null);
    setSelectedCard('');
    setSenderCardId('');

    close();
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content border-0"
          style={{ borderRadius: '28px' }}
        >

          {/* HEADER */}
          <div className="modal-header border-0 px-4 pt-4">
            <div>
              <h4 className="fw-bold">Send Money</h4>
              <small className="text-secondary">
                Transfer money instantly
              </small>
            </div>

            <button className="btn-close" onClick={close}></button>
          </div>

          {/* BODY */}
          <div className="modal-body px-4">

            {/* SEARCH USER */}
            <div className="d-flex gap-2">
              <input
                type="email"
                className="form-control rounded-4 py-3"
                placeholder="Enter user email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="btn text-white px-4"
                style={{
                  background: '#18c37e',
                  borderRadius: '16px',
                }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="text-center mt-4">
                Loading...
              </div>
            )}

            {/* USER CARD */}
            {receiver && (
              <div className="bg-light rounded-4 p-4 mt-4">

                {/* USER INFO */}
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/60?u=${receiver.email}`}
                    className="rounded-circle"
                    style={{
                      width: '55px',
                      height: '55px',
                      objectFit: 'cover',
                    }}
                  />

                  <div>
                    <h6 className="fw-bold mb-1">
                      {receiver.name}
                    </h6>

                    <small className="text-secondary">
                      {receiver.email}
                    </small>
                  </div>
                </div>

                {/* 🔥 YOUR CARD SELECT (FIX ADDED) */}
                <div className="mt-4">
                  <label className="form-label fw-semibold">
                    Select Your Card
                  </label>

                  <select
                    className="form-select rounded-4 py-3"
                    value={senderCardId}
                    onChange={(e) => setSenderCardId(e.target.value)}
                  >
                    <option value="">Choose Your Card</option>

                    {cards?.map((card: any) => (
                      <option key={card._id} value={card._id}>
                        ****{card.cardNumber?.slice(-3)} | £{card.balance}
                      </option>
                    ))}
                  </select>
                </div>

                {/* RECEIVER CARD */}
                <div className="mt-4">
                  <label className="form-label fw-semibold">
                    Select Receiver Card
                  </label>

                  <select
                    className="form-select rounded-4 py-3"
                    value={selectedCard}
                    onChange={(e) => setSelectedCard(e.target.value)}
                  >
                    <option value="">Choose Card</option>

                    {receiver.cards?.map((card: any) => (
                      <option key={card._id} value={card._id}>
                        ****{card.cardNumber?.slice(-3)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* AMOUNT */}
                <div className="mt-4">
                  <label className="form-label fw-semibold">
                    Amount
                  </label>

                  <input
                    type="number"
                    className="form-control rounded-4 py-3"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                {/* NOTE */}
                <div className="mt-3">
                  <label className="form-label fw-semibold">
                    Note
                  </label>

                  <textarea
                    className="form-control rounded-4"
                    rows={3}
                    placeholder="Payment note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>

                {/* SEND BUTTON */}
                <button
                  className="btn text-white w-100 mt-4 py-3"
                  style={{
                    background: '#18c37e',
                    borderRadius: '18px',
                  }}
                  onClick={handleSend}
                >
                  Send Money
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyModal;