import { configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';

import authReducer from '../redux/auth/authSlice';

import cardReducer from '../redux/card/cardSlice';

import paymentReducer from '../redux/payment/paymentSlice';

import transactionReducer from '../redux/transaction/transactionSlice';

import transferReducer from '../redux/transfer/transferSlice';

import rootSaga from '../redux/rootSaga';

const sagaMiddleware =
  createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,

    card: cardReducer,

    payment: paymentReducer,

    transaction: transactionReducer,

    transfer: transferReducer,
  },

  middleware: (
    getDefaultMiddleware
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;