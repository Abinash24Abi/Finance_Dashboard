import { useState } from 'react';

import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../app/store';

import { addCardRequest } from '../redux/card/cardSlice';

interface Props {
  show: boolean;

  close: () => void;
}

const AddCardModal = ({
  show,
  close,
}: Props) => {
  const dispatch =
    useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    cardHolder: '',

    cardNumber: '',

    balance: '',

    expiry: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !form.cardHolder ||
      !form.cardNumber ||
      !form.balance ||
      !form.expiry
    ) {
      alert('Please fill all fields');

      return;
    }

    dispatch(addCardRequest(form));

    close();

    setForm({
      cardHolder: '',

      cardNumber: '',

      balance: '',

      expiry: '',
    });
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content border-0"
          style={{
            borderRadius: '28px',
          }}
        >
          {/* HEADER */}
          <div className="modal-header border-0 px-4 pt-4">
            <div>
              <h4 className="fw-bold mb-1">
                Add New Card
              </h4>

              <small className="text-secondary">
                Add your banking card
              </small>
            </div>

            <button
              className="btn-close"
              onClick={close}
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body px-4">
            {/* CARD PREVIEW */}
            <div
              className="text-white p-4 mb-4"
              style={{
                height: '300px',

                borderRadius: '24px',

                background:
                  'linear-gradient(135deg,#1f1f1f,#373737)',

                position: 'relative',

                overflow: 'hidden',
              }}
            >
              {/* EFFECT */}
              <div
                style={{
                  position:
                    'absolute',

                  width: '220px',

                  height: '220px',

                  borderRadius:
                    '50%',

                  background:
                    'rgba(255,255,255,0.06)',

                  top: '-80px',

                  right: '-60px',
                }}
              ></div>

              <div className="position-relative">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small>
                      Card Holder
                    </small>

                    <h6 className="mt-2">
                      {form.cardHolder ||
                        'Your Name'}
                    </h6>
                  </div>

                  <i className="bi bi-wifi fs-4"></i>
                </div>

                <div className="mt-5">
                  <h3
                    style={{
                      letterSpacing:
                        '4px',
                    }}
                  >
                    {form.cardNumber ||
                      '0000 0000 0000 0000'}
                  </h3>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <div>
                    <small>
                      Expiry
                    </small>

                    <p className="mb-0 mt-1">
                      {form.expiry ||
                        '09/28'}
                    </p>
                  </div>

                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width:
                          '25px',

                        height:
                          '25px',

                        borderRadius:
                          '50%',

                        background:
                          '#ff6b6b',
                      }}
                    ></div>

                    <div
                      style={{
                        width:
                          '25px',

                        height:
                          '25px',

                        borderRadius:
                          '50%',

                        background:
                          '#ffb84d',

                        marginLeft:
                          '-10px',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* INPUTS */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Card Holder
              </label>

              <input
                type="text"
                name="cardHolder"
                value={
                  form.cardHolder
                }
                onChange={
                  handleChange
                }
                className="form-control py-3 rounded-4"
                placeholder="Enter card holder"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Card Number
              </label>

              <input
                type="text"
                name="cardNumber"
                value={
                  form.cardNumber
                }
                onChange={
                  handleChange
                }
                className="form-control py-3 rounded-4"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Balance
                  </label>

                  <input
                    type="number"
                    name="balance"
                    value={
                      form.balance
                    }
                    onChange={
                      handleChange
                    }
                    className="form-control py-3 rounded-4"
                    placeholder="5000"
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Expiry
                  </label>

                  <input
                    type="text"
                    name="expiry"
                    value={
                      form.expiry
                    }
                    onChange={
                      handleChange
                    }
                    className="form-control py-3 rounded-4"
                    placeholder="09/28"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer border-0 px-4 pb-4">
            <button
              className="btn btn-light rounded-4 px-4 py-3"
              onClick={close}
            >
              Cancel
            </button>

            <button
              className="btn text-white rounded-4 px-5 py-3"
              style={{
                background:
                  '#18c37e',
              }}
              onClick={
                handleSubmit
              }
            >
              Save Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;