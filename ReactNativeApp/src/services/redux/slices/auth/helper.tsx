import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { ENDPOINTS } from '../../../api/apiClient';

export const loginUser = createAsyncThunk(
  'loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiClient.post(ENDPOINTS.login, credentials);
      console.log('Login response :: ', response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'Login Failed');
    }
  },
);
