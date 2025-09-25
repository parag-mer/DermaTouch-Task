import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { ENDPOINTS } from '../../../api/apiClient';
import { IProduct } from '../products';

export const fetchOrders = createAsyncThunk(
  'fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(ENDPOINTS.getOrders);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch orders');
    }
  },
);

export const placeOrder = createAsyncThunk(
  'placeOrder',
  async (
    orderData: { items: IProduct[]; total: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiClient.post(ENDPOINTS.placeOrder, orderData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to place order');
    }
  },
);
