import { createSlice } from '@reduxjs/toolkit';

import type { PaymentState } from './paymentTypes';

const initialState: PaymentState = {
  loading: false,

  payments: [],

  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',

  initialState,

  reducers: {
    getPaymentsRequest: (
      state
    ) => {
      state.loading = true;
    },

    getPaymentsSuccess: (
      state,
      action
    ) => {
      state.loading = false;

      state.payments =
        action.payload;
    },

    addPaymentRequest: (
      state,
      action
    ) => {
      state.loading = true;
    },

    addPaymentSuccess: (
      state,
      action
    ) => {
      state.loading = false;

      state.payments.push(
        action.payload
      );
    },

    paymentFailure: (
      state,
      action
    ) => {
      state.loading = false;

      state.error = action.payload;
    },
  },
});

export const {
  getPaymentsRequest,
  getPaymentsSuccess,

  addPaymentRequest,
  addPaymentSuccess,

  paymentFailure,
} = paymentSlice.actions;

export default paymentSlice.reducer;