import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders, placeOrder } from './helper';
import { IProduct } from '../products';

export interface IOrder {
  id: number;
  items: IProduct[];
  total: number;
  createdAt: string;
}

export interface IOrderSlice {
  orders: IOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: IOrderSlice = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, (state: IOrderSlice) => {
        state.loading = true;
        state.error = null;
        return state;
      })
      .addCase(fetchOrders.fulfilled, (state: IOrderSlice, action) => {
        state.loading = false;
        state.orders = action.payload;
        return state;
      })
      .addCase(fetchOrders.rejected, (state: IOrderSlice, action) => {
        state.loading = false;
        state.error = action.payload as string;
        return state;
      })
      .addCase(placeOrder.fulfilled, (state: IOrderSlice, action) => {
        state.orders.push(action.payload);
        return state;
      });
  },
});

export const orderReducer = orderSlice.reducer;
