import axios from 'axios';

const API =
  `${import.meta.env.VITE_API_URL}/api/transfers`;


// GET TRANSFERS
export const getTransfersApi =
  () => {
    return axios.get(API, {
      withCredentials: true,
    });
  };


// SEND MONEY
export const sendMoneyApi = (
  data: any
) => {
  return axios.post(
    `${API}/send`,
    data,
    {
      withCredentials: true,
    }
  );
};


// RECEIVE MONEY
export const receiveMoneyApi = (
  data: any
) => {
  return axios.post(
    `${API}/receive`,
    data,
    {
      withCredentials: true,
    }
  );
};


// REQUEST MONEY
export const requestMoneyApi = (
  data: any
) => {
  return axios.post(
    `${API}/request`,
    data,
    {
      withCredentials: true,
    }
  );
};


// INVOICE
export const invoiceApi = (
  data: any
) => {
  return axios.post(
    `${API}/invoice`,
    data,
    {
      withCredentials: true,
    }
  );
};