import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  loginFailure,
  loginRequest,
  loginSuccess,

  signupFailure,
  signupRequest,
  signupSuccess,

  getUserFailure,
  getUserRequest,
  getUserSuccess,

  logoutRequest,
  logoutSuccess,
} from './authSlice';

import {
  loginApi,
  signupApi,
  getUserApi,
  logoutApi,
} from './authApi';


// LOGIN
function* loginWorker(
  action: any
): any {
  try {
    const response = yield call(
      loginApi,
      action.payload
    );

    yield put(
      loginSuccess(response.data.user)
    );
    alert('Login Successful');
  } catch (error: any) {
    yield put(
      loginFailure(
        error.response.data.message
      )
    );
    alert('Login Failed: ' + error.response.data.message);
  }
}


// SIGNUP
function* signupWorker(
  action: any
): any {
  try {
    const response = yield call(
      signupApi,
      action.payload
    );

    yield put(
      signupSuccess(response.data.user)
    );
    alert('Signup Successful');
  } catch (error: any) {
    yield put(
      signupFailure(
        error.response.data.message
      )
    );
    alert('Signup Failed: ' + error.response.data.message);
  }
}


// GET USER
function* getUserWorker(): any {
  try {
    const response = yield call(
      getUserApi
    );

    yield put(
      getUserSuccess(response.data.user)
    );
  } catch (error: any) {
    yield put(
      getUserFailure(
        error.response.data.message
      )
    );
  }
}


// LOGOUT
function* logoutWorker(): any {
  try {
    yield call(logoutApi);

    yield put(logoutSuccess());
    alert('Logged out successfully');
  } catch (error) {
    console.log(error);
    alert('Logout failed');
  }
}

export default function* authSaga() {
  yield takeLatest(
    loginRequest.type,
    loginWorker
  );

  yield takeLatest(
    signupRequest.type,
    signupWorker
  );

  yield takeLatest(
    getUserRequest.type,
    getUserWorker
  );

  yield takeLatest(
    logoutRequest.type,
    logoutWorker
  );
}