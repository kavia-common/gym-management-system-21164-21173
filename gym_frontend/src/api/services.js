import api, { setAuthToken } from './client';
import { getToken, setToken } from '../utils/auth';

// Link axios to token getter (no-op unless setToken is called elsewhere)
setAuthToken(getToken);

// PUBLIC_INTERFACE
export const ClassesAPI = {
  /** CRUD for classes (with /api prefix) */
  async list(params = {}) {
    const { data } = await api.get('/api/classes', { params });
    return data;
  },
  async get(id) {
    const { data } = await api.get(`/api/classes/${id}`);
    return data;
  },
  async create(payload) {
    const { data } = await api.post('/api/classes', payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await api.put(`/api/classes/${id}`, payload);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/api/classes/${id}`);
    return data;
  },
};

// PUBLIC_INTERFACE
export const BookingsAPI = {
  /** CRUD for bookings (with /api prefix) */
  async list(params = {}) {
    const { data } = await api.get('/api/bookings', { params });
    return data;
  },
  async get(id) {
    const { data } = await api.get(`/api/bookings/${id}`);
    return data;
  },
  async create(payload) {
    const { data } = await api.post('/api/bookings', payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await api.put(`/api/bookings/${id}`, payload);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/api/bookings/${id}`);
    return data;
  },
};

// PUBLIC_INTERFACE
export const MembershipsAPI = {
  /** CRUD for memberships (with /api prefix) */
  async list(params = {}) {
    const { data } = await api.get('/api/memberships', { params });
    return data;
  },
  async get(id) {
    const { data } = await api.get(`/api/memberships/${id}`);
    return data;
  },
  async create(payload) {
    const { data } = await api.post('/api/memberships', payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await api.put(`/api/memberships/${id}`, payload);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/api/memberships/${id}`);
    return data;
  },
};

// PUBLIC_INTERFACE
export const DevAuthAPI = {
  /**
   * Development-only login to obtain a token.
   * Expects backend route: POST /api/auth/dev-login with { email?: string }
   * Returns: { token }
   */
  async devLogin(payload = {}) {
    const { data } = await api.post('/api/auth/dev-login', payload);
    if (data?.token) {
      setToken(data.token);
    }
    return data;
  },
};
