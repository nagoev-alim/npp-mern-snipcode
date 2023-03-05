import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

// Set headers
const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Create API
export const API = {
  // Auth services
  auth: {
    register: createAsyncThunk(
      'auth/register',
      async (payload, { rejectWithValue }) => {
        try {
          const { data } = await axiosInstance.post('/users/register', payload);
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    login: createAsyncThunk(
      'auth/login',
      async (payload, { rejectWithValue }) => {
        try {
          const { data } = await axiosInstance.post('/users/login', payload);
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
  },
  // Snippet services
  snippet: {
    get: createAsyncThunk(
      'snippet/get',
      async (_, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.user.token;
          const { data } = await axiosInstance.get('/snippet', headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    create: createAsyncThunk(
      'snippet/create',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.user.token;
          const { data } = await axiosInstance.post('/snippet', payload, headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    update: createAsyncThunk(
      'snippet/update',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.user.token;
          const { data } = await axiosInstance.put(`/snippet/${payload.id}`, payload.data, headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    delete: createAsyncThunk(
      'snippet/delete',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.user.token;
          await axiosInstance.delete(`/snippet/${payload}`, headers(token));
          return payload;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
  },
};
