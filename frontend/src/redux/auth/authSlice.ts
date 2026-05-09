import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthState, User } from './authTypes';

const initialState: AuthState = {
  loading: false,

  user: null,

  error: null,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    // LOGIN
    loginRequest: (
      state,
      _action: PayloadAction<{
        email: string;
        password: string;
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (
      state,
      action: PayloadAction<User>
    ) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },

    loginFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    // SIGNUP
    signupRequest: (
      state,
      _action: PayloadAction<{
        name: string;
        email: string;
        password: string;
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },

    signupSuccess: (
      state,
      action: PayloadAction<User>
    ) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },

    signupFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    // GET USER
    getUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    getUserSuccess: (
      state,
      action: PayloadAction<User>
    ) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },

    getUserFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    // LOGOUT
    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,

  signupRequest,
  signupSuccess,
  signupFailure,

  getUserRequest,
  getUserSuccess,
  getUserFailure,

  logoutRequest,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;