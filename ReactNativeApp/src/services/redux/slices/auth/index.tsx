import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './helper';

const AUTH_SLICE = 'AuthSlice';

export interface IAuthSliceType {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: IAuthSliceType = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: AUTH_SLICE,
  initialState: initialState,
  reducers: {
    logout: (state: IAuthSliceType) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state: IAuthSliceType) => {
        state.loading = true;
        state.error = null;
        return state;
      })
      .addCase(loginUser.fulfilled, (state: IAuthSliceType, action) => {
        if (action.payload) {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        } else {
          state.loading = false;
          state.error = action.payload as string;
        }
        return state;
      })
      .addCase(loginUser.rejected, (state: IAuthSliceType, action) => {
        state.loading = false;
        state.error = action.payload as string;
        return state;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
