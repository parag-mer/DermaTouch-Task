import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './helper';

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  image?: string;
}

export interface IProductSlice {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: IProductSlice = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state: IProductSlice) => {
        state.loading = true;
        state.error = null;
        return state;
      })
      .addCase(fetchProducts.fulfilled, (state: IProductSlice, action) => {
        state.loading = false;
        state.products = action.payload;
        return state;
      })
      .addCase(fetchProducts.rejected, (state: IProductSlice, action) => {
        state.loading = false;
        state.error = action.payload as string;
        return state;
      });
  },
});

export const productReducer = productSlice.reducer;
