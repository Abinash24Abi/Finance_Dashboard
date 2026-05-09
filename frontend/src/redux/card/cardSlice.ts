import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Card, CardState } from './cardTypes';

const initialState: CardState = {
  loading: false,

  cards: [],

  error: null,
};

const cardSlice = createSlice({
  name: 'card',

  initialState,

  reducers: {
    getCardsRequest: (state) => {
      state.loading = true;
    },

    getCardsSuccess: (
      state,
      action: PayloadAction<Card[]>
    ) => {
      state.loading = false;
      state.cards = action.payload;
    },

    addCardRequest: (state) => {
      state.loading = true;
    },

    addCardSuccess: (
      state,
      action
    ) => {
      state.loading = false;

      state.cards.push(action.payload);
    },

    cardFailure: (
      state,
      action
    ) => {
      state.loading = false;

      state.error = action.payload;
    },
  },
});

export const {
  getCardsRequest,
  getCardsSuccess,

  addCardRequest,
  addCardSuccess,

  cardFailure,
} = cardSlice.actions;

export default cardSlice.reducer;