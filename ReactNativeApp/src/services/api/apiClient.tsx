import axios from 'axios';

export const ENDPOINTS = {
  login: '/login',
  signup: '/register',
  getProducts: '/products',
  getOrders: '/orders',
  placeOrder: '/orders',
};

const apiClient = axios.create({
  baseURL: 'http://10.0.2.2:8000/api', // use localhost for emulator, change when deploying
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
