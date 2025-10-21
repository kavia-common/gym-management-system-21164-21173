import api, { setAuthToken } from './client';
import { getToken } from '../utils/auth';

// Link axios to token getter (no-op unless setToken is called elsewhere)
setAuthToken(getToken);

// PUBLIC_INTERFACE
export const ClassesAPI = {
  /** CRUD for classes */
  async list(params = {}) {
    const { data } = await api.get('/classes', { params });
    return data;
  },
  async get(id) {
    const { data } = await api.get(`/classes/${id}`);
    return data;
  },
  async create(payload) {
    const { data } = await api.post('/classes', payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await api.put(`/classes/${id}`, payload);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/classes/${id}`);
    return data;
  },
};

// PUBLIC_INTERFACE
export const BookingsAPI = {
  /** CRUD for bookings */
  async list(params = {}) {
    const { data } = await api.get('/bookings', { params });
    return data;
  },
  async get(id) {
    const { data } = await api.get(`/bookings/${id}`);
    return data;
  },
  async create(payload) {
    const { data } = await api.post('/bookings', payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await api.put(`/bookings/${id}`, payload);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/bookings/${id}`);
    return data;
  },
};

// PUBLIC_INTERFACE
export const MembershipsAPI = {
  /** CRUD for memberships */
  async list(params = {}) {
    const { data } = await api.get('/memberships', { params });
    return data;
  },
  async get(id) {
    const { data } = await api.get(`/memberships/${id}`);
    return data;
  },
  async create(payload) {
    const { data } = await api.post('/memberships', payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await api.put(`/memberships/${id}`, payload);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/memberships/${id}`);
    return data;
  },
};
