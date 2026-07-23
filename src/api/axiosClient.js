import axios from 'axios';

const axiosClient = axios.create({
  baseURL:  'https://til-up-production.up.railway.app/api',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('tilup_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On an expired/invalid session token, clear it and bounce to login — but not
// for auth endpoints, where a 401 just means wrong credentials for that form.
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const url = error.config?.url || '';
    const isAuthCall = url.includes('/auth/');
    if (error.response?.status === 401 && !isAuthCall) {
      localStorage.removeItem('tilup_token');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
