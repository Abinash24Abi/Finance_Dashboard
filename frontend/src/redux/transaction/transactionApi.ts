import axios from 'axios';

const API =
  `${import.meta.env.VITE_API_URL}/api/transactions`;


// GET
export const getTransactionsApi =
  () =>
    axios.get(API, {
      withCredentials: true,
    });


// ADD
export const addTransactionApi = (
  data: any
) =>
  axios.post(API, data, {
    withCredentials: true,
  });