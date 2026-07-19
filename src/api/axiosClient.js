import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://til-up-production.up.railway.app/api',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('tilup_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
