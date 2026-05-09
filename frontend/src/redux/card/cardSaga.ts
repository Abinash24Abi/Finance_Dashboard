import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  addCardApi,
  getCardsApi,
} from './cardApi';

import {
  addCardRequest,
  addCardSuccess,

  cardFailure,

  getCardsRequest,
  getCardsSuccess,
} from './cardSlice';


// GET CARDS
function* getCardsWorker(): any {
  try {
    const response = yield call(
      getCardsApi
    );

    yield put(
      getCardsSuccess(response.data.cards)
    );
  } catch (error: any) {
    yield put(
      cardFailure(
        error.response.data.message
      )
    );
  }
}


// ADD CARD
function* addCardWorker(
  action: any
): any {
  try {
    const response = yield call(
      addCardApi,
      action.payload
    );

    yield put(
      addCardSuccess(response.data.card)
    );
  } catch (error: any) {
    yield put(
      cardFailure(
        error.response.data.message
      )
    );
  }
}

export default function* cardSaga() {
  yield takeLatest(
    getCardsRequest.type,
    getCardsWorker
  );

  yield takeLatest(
    addCardRequest.type,
    addCardWorker
  );
}