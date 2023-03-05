import { createSlice } from '@reduxjs/toolkit';
/* =============================
📦 Custom Imports
============================= */

/* =============================
📦 Initial State Definitions
============================= */
const initialState = false;

/* =============================
📦 Create Slice
============================= */
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, { payload }) => {
      return payload;
    },
  },
  extraReducers: (builder) => {
  },
});

/* =============================
📦 Export Actions
============================= */
export const { toggleTheme } = themeSlice.actions;

/* =============================
📦 Export Reducer
============================= */
export const themeReducer = themeSlice.reducer;

/* =============================
📦 Create Selector
============================= */
export const themeSelector = {
  all: ({ theme }) => theme,
};
