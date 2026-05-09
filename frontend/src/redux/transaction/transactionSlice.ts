import { createSlice } from '@reduxjs/toolkit';

import type { TransactionState } from './transactionTypes';

const initialState: TransactionState = {
  loading: false,

  transactions: [],

  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',

  initialState,

  reducers: {
    getTransactionsRequest: (
      state
    ) => {
      state.loading = true;
    },

    getTransactionsSuccess: (
      state,
      action
    ) => {
      state.loading = false;

      state.transactions =
        action.payload;
    },

    addTransactionRequest: (
      state,
      action
    ) => {
      state.loading = true;
    },

    addTransactionSuccess: (
      state,
      action
    ) => {
      state.loading = false;

      state.transactions.push(
        action.payload
      );
    },

    transactionFailure: (
      state,
      action
    ) => {
      state.loading = false;

      state.error = action.payload;
    },
  },
});

export const {
  getTransactionsRequest,
  getTransactionsSuccess,

  addTransactionRequest,
  addTransactionSuccess,

  transactionFailure,
} = transactionSlice.actions;

export default transactionSlice.reducer;