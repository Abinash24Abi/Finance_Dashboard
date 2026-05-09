import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  getPaymentsApi,
  addPaymentApi,
} from './paymentApi';

import {
  addPaymentRequest,
  addPaymentSuccess,

  getPaymentsRequest,
  getPaymentsSuccess,

  paymentFailure,
} from './paymentSlice';


// GET PAYMENTS
function* getPaymentsWorker(): any {
  try {
    const response = yield call(
      getPaymentsApi
    );

    yield put(
      getPaymentsSuccess(
        response.data.payments
      )
    );
  } catch (error: any) {
    yield put(
      paymentFailure(
        error.response.data.message
      )
    );
  }
}


// ADD PAYMENT
function* addPaymentWorker(
  action: any
): any {
  try {
    const response = yield call(
      addPaymentApi,
      action.payload
    );

    yield put(
      addPaymentSuccess(
        response.data.payment
      )
    );
  } catch (error: any) {
    yield put(
      paymentFailure(
        error.response.data.message
      )
    );
  }
}

export default function* paymentSaga() {
  yield takeLatest(
    getPaymentsRequest.type,
    getPaymentsWorker
  );

  yield takeLatest(
    addPaymentRequest.type,
    addPaymentWorker
  );
}