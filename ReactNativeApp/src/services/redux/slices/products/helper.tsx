import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { ENDPOINTS } from '../../../api/apiClient';

export const fetchProducts = createAsyncThunk(
  'fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(ENDPOINTS.getProducts);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch products',
      );
    }
  },
);
