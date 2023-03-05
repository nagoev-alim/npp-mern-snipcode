import { createSlice } from '@reduxjs/toolkit';
import { API } from '../../api/api.js';

// Initial State Definition
const initialState = {
  user: null,
  status: 'idle', // loading | success | failed
  error: false,
  message: '',
};

// Create Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder
      // 📦 Register a new user
      .addCase(API.auth.register.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.auth.register.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload;
      })
      .addCase(API.auth.register.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // 📦 Login a user
      .addCase(API.auth.login.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.auth.login.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload;
      })
      .addCase(API.auth.login.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});

// Create Action
export const { resetAuthState, logout } = authSlice.actions;

// Create Reducer
export const authReducer = authSlice.reducer;

// Create Selectors
export const authSelector = {
  all: ({ auth }) => auth,
};
