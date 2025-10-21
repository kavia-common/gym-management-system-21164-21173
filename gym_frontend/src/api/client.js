import axios from 'axios';
import { useAuthStore } from '../state/authStore';
import { getEnv } from '../utils/env';

const { REACT_APP_API_BASE_URL } = getEnv();

const client = axios.create({
  baseURL: REACT_APP_API_BASE_URL || '/api',
  timeout: 15000,
});

// Attach Authorization header if token exists
client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
