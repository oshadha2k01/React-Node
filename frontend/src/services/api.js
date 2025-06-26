import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL = 'http://localhost:5000/api';

// Create an axios instance to use for API calls
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User-related API functions
export const userAPI = {
  register: (userData) => {
    console.log('API: Sending registration request with data:', userData);
    return api.post('/users/register', userData);
  },
  login: (userData) => {
    return api.post('/users/login', userData);
  },
};

// Product-related API functions
export const productAPI = {
  getAll: () => {
    return api.get('/products');
  },
  getById: (id) => {
    return api.get(`/products/${id}`);
  },
  create: (productData) => {
    return api.post('/products', productData);
  },
  update: (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },
  delete: (id) => {
    return api.delete(`/products/${id}`);
  },
};

// Export the axios instance (optional if needed elsewhere)
export default api;
