import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  addTransactionApi,
  getTransactionsApi,
} from './transactionApi';

import {
  addTransactionRequest,
  addTransactionSuccess,

  getTransactionsRequest,
  getTransactionsSuccess,

  transactionFailure,
} from './transactionSlice';


// GET
function* getTransactionsWorker(): any {
  try {
    const response = yield call(
      getTransactionsApi
    );

    yield put(
      getTransactionsSuccess(
        response.data.transactions
      )
    );
  } catch (error: any) {
    yield put(
      transactionFailure(
        error.response.data.message
      )
    );
  }
}


// ADD
function* addTransactionWorker(
  action: any
): any {
  try {
    const response = yield call(
      addTransactionApi,
      action.payload
    );

    yield put(
      addTransactionSuccess(
        response.data.transaction
      )
    );
  } catch (error: any) {
    yield put(
      transactionFailure(
        error.response.data.message
      )
    );
  }
}

export default function* transactionSaga() {
  yield takeLatest(
    getTransactionsRequest.type,
    getTransactionsWorker
  );

  yield takeLatest(
    addTransactionRequest.type,
    addTransactionWorker
  );
}