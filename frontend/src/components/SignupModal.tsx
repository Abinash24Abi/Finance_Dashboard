import { useState, type FormEvent } from 'react';

import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../app/store';

import { signupRequest } from '../redux/auth/authSlice';

interface Props {
  show: boolean;

  close: () => void;
}

const SignupModal = ({
  show,
  close,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    name: '',

    email: '',

    password: '',
  });

  const handleSignup = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    dispatch(signupRequest(form));

    close();
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4">
          <div className="modal-header">
            <h5 className="fw-bold">
              Signup
            </h5>

            <button
              className="btn-close"
              onClick={close}
            ></button>
          </div>

          <form
            className="modal-body"
            onSubmit={handleSignup}
          >
            <input
              type="text"
              placeholder="Name"
              className="form-control mb-3"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

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
                className="btn btn-success w-100"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;