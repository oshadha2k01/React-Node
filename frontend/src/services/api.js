import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userAPI = {
  register: (userData) => {
    console.log('API: Sending registration request with data:', userData);
    return api.post('/users/register', userData);
  },
  login: (userData) => {
    return api.post('/users/login', userData);
  },
};

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

export default api;

