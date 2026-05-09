import { createSlice } from '@reduxjs/toolkit';

import type { TransferState } from './transferTypes';

const initialState: TransferState = {
  loading: false,

  transfers: [],

  error: null,
};

const transferSlice = createSlice({
  name: 'transfer',

  initialState,

  reducers: {
    getTransfersRequest: (
      state
    ) => {
      state.loading = true;
    },

    getTransfersSuccess: (
      state,
      action
    ) => {
      state.loading = false;

      state.transfers =
        action.payload;
    },

    sendMoneyRequest: (
      state,
      action
    ) => {
      state.loading = true;
    },

    receiveMoneyRequest: (
      state,
      action
    ) => {
      state.loading = true;
    },

    requestMoneyRequest: (
      state,
      action
    ) => {
      state.loading = true;
    },

    invoiceRequest: (
      state,
      action
    ) => {
      state.loading = true;
    },

    transferSuccess: (
      state,
      action
    ) => {
      state.loading = false;

      state.transfers.unshift(
        action.payload
      );
    },

    transferFailure: (
      state,
      action
    ) => {
      state.loading = false;

      state.error = action.payload;
    },
  },
});

export const {
  getTransfersRequest,
  getTransfersSuccess,

  sendMoneyRequest,

  receiveMoneyRequest,

  requestMoneyRequest,

  invoiceRequest,

  transferSuccess,

  transferFailure,
} = transferSlice.actions;

export default transferSlice.reducer;