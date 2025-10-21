import axios from 'axios';

/**
 * Axios client configured with baseURL and simple interceptors.
 * baseURL is taken from REACT_APP_API_URL or defaults to http://localhost:4000
 * Note: Backend should enable CORS for http://localhost:3000 in development.
 */

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// PUBLIC_INTERFACE
export function setAuthToken(getTokenFn) {
  /**
   * Attach a function that returns the current auth token (sync) to be added on each request.
   * No-op by default; you can pass a function that returns a string token.
   */
  api.interceptors.request.use((config) => {
    try {
      const token = typeof getTokenFn === 'function' ? getTokenFn() : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore token failures
    }
    return config;
  });
}

// Basic response error logging
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Log and rethrow; UI can handle messaging
    // eslint-disable-next-line no-console
    console.error('API error:', err?.response?.status, err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;
