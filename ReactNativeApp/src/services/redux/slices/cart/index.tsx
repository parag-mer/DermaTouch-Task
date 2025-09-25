import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../products';

interface cartItem extends IProduct {
  quantity: number;
}

export interface ICartSlice {
  items: cartItem[];
}

const initialState: ICartSlice = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state: ICartSlice, action: PayloadAction<IProduct>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state: ICartSlice, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (
      state: ICartSlice,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state: ICartSlice) => {
      state.items = [];
    },
  },
});

export const { addToCart, clearCart, removeFromCart, updateQuantity } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
