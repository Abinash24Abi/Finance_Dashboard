import axios from 'axios';

const API =
  `${import.meta.env.VITE_API_URL}/api/cards`;


// GET CARDS
export const getCardsApi = () =>
  axios.get(API, {
    withCredentials: true,
  });


// ADD CARD
export const addCardApi = (
  data: any
) =>
  axios.post(API, data, {
    withCredentials: true,
  });