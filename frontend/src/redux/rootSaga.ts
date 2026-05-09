import { all } from 'redux-saga/effects';

import authSaga from './auth/authSaga';

import cardSaga from './card/cardSaga';

import paymentSaga from './payment/paymentSaga';

import transactionSaga from './transaction/transactionSaga';

import transferSaga from './transfer/transferSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),

    cardSaga(),

    paymentSaga(),

    transactionSaga(),

    transferSaga(),
  ]);
}