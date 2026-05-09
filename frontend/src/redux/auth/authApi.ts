import axios from 'axios';

const API = `${import.meta.env.VITE_API_URL}/api/auth`;


// LOGIN
export const loginApi = (data: any) =>
  axios.post(`${API}/login`, data, {
    withCredentials: true,
  });


// SIGNUP
export const signupApi = (data: any) =>
  axios.post(`${API}/signup`, data, {
    withCredentials: true,
  });


// GET USER
export const getUserApi = () =>
  axios.get(`${API}/me`, {
    withCredentials: true,
  });


// LOGOUT
export const logoutApi = () =>
  axios.post(
    `${API}/logout`,
    {},
    {
      withCredentials: true,
    }
  );