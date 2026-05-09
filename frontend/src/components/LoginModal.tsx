import { useState, type FormEvent } from 'react';

import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../app/store';

import { loginRequest } from '../redux/auth/authSlice';

interface Props {
  show: boolean;

  close: () => void;
}

const LoginModal = ({
  show,
  close,
}: Props) => {
  const dispatch =
    useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    email: '',

    password: '',
  });

  const handleLogin = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    dispatch(loginRequest(form));

    close();
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4">
          <div className="modal-header">
            <h5 className="fw-bold">
              Login
            </h5>

            <button
              className="btn-close"
              onClick={close}
            ></button>
          </div>

          <form
            className="modal-body"
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-3"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
            />

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;