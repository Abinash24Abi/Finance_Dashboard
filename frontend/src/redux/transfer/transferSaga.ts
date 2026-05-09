import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  getTransfersApi,
  sendMoneyApi,
  receiveMoneyApi,
  requestMoneyApi,
  invoiceApi,
} from './transferApi';

import {
  getTransfersRequest,
  getTransfersSuccess,

  sendMoneyRequest,

  receiveMoneyRequest,

  requestMoneyRequest,

  invoiceRequest,

  transferSuccess,

  transferFailure,
} from './transferSlice';

import {
  getCardsRequest,
} from '../card/cardSlice';

import {
  getTransactionsRequest,
} from '../transaction/transactionSlice';


// GET TRANSFERS
function* getTransfersWorker(): any {
  try {
    const response = yield call(
      getTransfersApi
    );

    yield put(
      getTransfersSuccess(
        response.data.transfers
      )
    );
  } catch (error: any) {
    yield put(
      transferFailure(
        error.response?.data
          ?.message ||
          'Failed to fetch transfers'
      )
    );
  }
}


// SEND MONEY
function* sendMoneyWorker(
  action: any
): any {
  try {
    const response = yield call(
      sendMoneyApi,
      action.payload
    );

    yield put(
      transferSuccess(
        response.data.transfer
      )
    );

    // REFRESH DASHBOARD
    yield put(
      getCardsRequest()
    );

    yield put(
      getTransactionsRequest()
    );

    yield put(
      getTransfersRequest()
    );

    alert('Money Sent Successfully');
  } catch (error: any) {
    yield put(
      transferFailure(
        error.response?.data
          ?.message ||
          'Send Money Failed'
      )
    );

    alert(
      error.response?.data
        ?.message ||
        'Send Failed'
    );
  }
}


// RECEIVE MONEY
function* receiveMoneyWorker(
  action: any
): any {
  try {
    const response = yield call(
      receiveMoneyApi,
      action.payload
    );

    yield put(
      transferSuccess(
        response.data.transfer
      )
    );

    yield put(
      getCardsRequest()
    );

    yield put(
      getTransactionsRequest()
    );

    alert(
      'Money Received Successfully'
    );
  } catch (error: any) {
    yield put(
      transferFailure(
        error.response?.data
          ?.message ||
          'Receive Failed'
      )
    );
  }
}


// REQUEST MONEY
function* requestMoneyWorker(
  action: any
): any {
  try {
    const response = yield call(
      requestMoneyApi,
      action.payload
    );

    yield put(
      transferSuccess(
        response.data.request
      )
    );

    alert(
      'Request Sent Successfully'
    );
  } catch (error: any) {
    yield put(
      transferFailure(
        error.response?.data
          ?.message ||
          'Request Failed'
      )
    );
  }
}


// INVOICE
function* invoiceWorker(
  action: any
): any {
  try {
    const response = yield call(
      invoiceApi,
      action.payload
    );

    yield put(
      transferSuccess(
        response.data.invoice
      )
    );

    alert(
      'Invoice Created Successfully'
    );
  } catch (error: any) {
    yield put(
      transferFailure(
        error.response?.data
          ?.message ||
          'Invoice Failed'
      )
    );
  }
}


// ROOT
export default function* transferSaga() {
  yield takeLatest(
    getTransfersRequest.type,
    getTransfersWorker
  );

  yield takeLatest(
    sendMoneyRequest.type,
    sendMoneyWorker
  );

  yield takeLatest(
    receiveMoneyRequest.type,
    receiveMoneyWorker
  );

  yield takeLatest(
    requestMoneyRequest.type,
    requestMoneyWorker
  );

  yield takeLatest(
    invoiceRequest.type,
    invoiceWorker
  );
}