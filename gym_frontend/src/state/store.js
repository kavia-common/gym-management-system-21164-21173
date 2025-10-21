import { create } from 'zustand';
import { ClassesAPI, BookingsAPI, MembershipsAPI } from '../api/services';

/**
 * Centralized entity store.
 * Contains collections for classes, bookings, memberships and fetch/create/update/delete helpers.
 */

const initialListState = { items: [], loading: false, error: null };

export const useGymStore = create((set, get) => ({
  // entity slices
  classes: { ...initialListState },
  bookings: { ...initialListState },
  memberships: { ...initialListState },

  // selection/detail
  selected: { entity: null, data: null, loading: false, error: null },

  // Actions: Classes
  async fetchClasses(params) {
    set((s) => ({ classes: { ...s.classes, loading: true, error: null } }));
    try {
      const data = await ClassesAPI.list(params);
      set({ classes: { items: data || [], loading: false, error: null } });
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Failed to load classes';
      set({ classes: { ...initialListState, error: msg } });
    }
  },
  async createClass(payload) {
    const res = await ClassesAPI.create(payload);
    set((s) => ({ classes: { ...s.classes, items: [res, ...s.classes.items] } }));
    return res;
  },
  async updateClass(id, payload) {
    const res = await ClassesAPI.update(id, payload);
    set((s) => ({
      classes: {
        ...s.classes,
        items: s.classes.items.map((i) => (i.id === id ? res : i)),
      },
    }));
    return res;
  },
  async deleteClass(id) {
    await ClassesAPI.remove(id);
    set((s) => ({
      classes: { ...s.classes, items: s.classes.items.filter((i) => i.id !== id) },
    }));
  },

  // Actions: Bookings
  async fetchBookings(params) {
    set((s) => ({ bookings: { ...s.bookings, loading: true, error: null } }));
    try {
      const data = await BookingsAPI.list(params);
      set({ bookings: { items: data || [], loading: false, error: null } });
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Failed to load bookings';
      set({ bookings: { ...initialListState, error: msg } });
    }
  },
  async createBooking(payload) {
    const res = await BookingsAPI.create(payload);
    set((s) => ({ bookings: { ...s.bookings, items: [res, ...s.bookings.items] } }));
    return res;
  },
  async updateBooking(id, payload) {
    const res = await BookingsAPI.update(id, payload);
    set((s) => ({
      bookings: {
        ...s.bookings,
        items: s.bookings.items.map((i) => (i.id === id ? res : i)),
      },
    }));
    return res;
  },
  async deleteBooking(id) {
    await BookingsAPI.remove(id);
    set((s) => ({
      bookings: { ...s.bookings, items: s.bookings.items.filter((i) => i.id !== id) },
    }));
  },

  // Actions: Memberships
  async fetchMemberships(params) {
    set((s) => ({ memberships: { ...s.memberships, loading: true, error: null } }));
    try {
      const data = await MembershipsAPI.list(params);
      set({ memberships: { items: data || [], loading: false, error: null } });
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Failed to load memberships';
      set({ memberships: { ...initialListState, error: msg } });
    }
  },
  async createMembership(payload) {
    const res = await MembershipsAPI.create(payload);
    set((s) => ({ memberships: { ...s.memberships, items: [res, ...s.memberships.items] } }));
    return res;
  },
  async updateMembership(id, payload) {
    const res = await MembershipsAPI.update(id, payload);
    set((s) => ({
      memberships: {
        ...s.memberships,
        items: s.memberships.items.map((i) => (i.id === id ? res : i)),
      },
    }));
    return res;
  },
  async deleteMembership(id) {
    await MembershipsAPI.remove(id);
    set((s) => ({
      memberships: { ...s.memberships, items: s.memberships.items.filter((i) => i.id !== id) },
    }));
  },

  // Selection helpers
  async selectEntity(entity, id, getFn) {
    set({ selected: { entity, data: null, loading: true, error: null } });
    try {
      const data = await getFn(id);
      set({ selected: { entity, data, loading: false, error: null } });
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Failed to load';
      set({ selected: { entity, data: null, loading: false, error: msg } });
    }
  },
  clearSelected() {
    set({ selected: { entity: null, data: null, loading: false, error: null } });
  },
}));
