import axios from 'axios';

// Create an instance pointing directly to your Express server
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Automatically attach the JWT token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;