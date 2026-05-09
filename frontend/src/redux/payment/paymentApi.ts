import axios from 'axios';

const API =
  `${import.meta.env.VITE_API_URL}/api/payments`;


// GET PAYMENTS
export const getPaymentsApi = () =>
  axios.get(API, {
    withCredentials: true,
  });


// ADD PAYMENT
export const addPaymentApi = (
  data: any
) =>
  axios.post(API, data, {
    withCredentials: true,
  });