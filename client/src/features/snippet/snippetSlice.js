import { createSlice } from '@reduxjs/toolkit';
import { API } from '../../api/api.js';

// Initial State Definition
const initialState = {
  entries: [],
  status: 'idle', // loading | success | failed
  error: false,
  message: '',
  editStatus: {
    isEditable: false,
    item: null,
  },
};

// Create Slice
const snippetSlice = createSlice({
  name: 'snippet',
  initialState,
  reducers: {
    resetSnippetState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
    setEditStatus: (state, { payload }) => {
      state.editStatus = payload;
    },
  },
  extraReducers: builder => {
    builder
      // 📦 Get all snippets
      .addCase(API.snippet.get.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.snippet.get.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = payload;
      })
      .addCase(API.snippet.get.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // 📦 Create a snippet
      .addCase(API.snippet.create.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.snippet.create.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.status = 'success';
        state.entries.push(payload);
      })
      .addCase(API.snippet.create.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // 📦 Update a snippet
      .addCase(API.snippet.update.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.snippet.update.fulfilled, (state, { payload }) => {
        state.status = 'success';

        const index = state.entries.findIndex(entry => entry._id === payload._id);
        const newArray = [...state.entries];
        newArray[index] = payload;
        state.entries = newArray;
      })
      .addCase(API.snippet.update.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // 📦 Delete a snippet
      .addCase(API.snippet.delete.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.snippet.delete.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.status = 'success';
        state.entries = state.entries.filter(entry => entry._id !== payload);
      })
      .addCase(API.snippet.delete.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});

// Create actions
export const { resetSnippetState, setEditStatus } = snippetSlice.actions;

// Create reducer
export const snippetReducer = snippetSlice.reducer;

// Create selectors
export const snippetSelector = {
  all: ({ snippet }) => snippet,
};
