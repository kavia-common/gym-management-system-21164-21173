import { create } from 'zustand';
import * as membershipsApi from '../api/memberships';
import * as classesApi from '../api/classes';
import * as bookingsApi from '../api/bookings';
import * as paymentsApi from '../api/payments';
import * as profileApi from '../api/profile';
import { getEnv } from '../utils/env';

const mockDashboard = {
  cards: [
    { title: 'Active Memberships', value: 128, subtitle: 'Current active plans' },
    { title: 'Today Classes', value: 8, subtitle: 'Scheduled sessions' },
    { title: 'Monthly Revenue', value: '$12,450', subtitle: 'This month' },
  ],
};

// PUBLIC_INTERFACE
export const useDataStore = create((set, get) => ({
  loading: false,
  memberships: [],
  classesList: [],
  bookings: [],
  payments: [],
  profile: null,
  dashboard: null,

  // PUBLIC_INTERFACE
  async loadDashboard() {
    const { REACT_APP_FEATURE_USE_MOCKS } = getEnv();
    set({ loading: true });
    try {
      if (REACT_APP_FEATURE_USE_MOCKS === 'true') {
        set({ dashboard: mockDashboard });
      } else {
        // Could call some dashboard endpoint; use composition of others for now
        set({ dashboard: mockDashboard });
      }
    } finally {
      set({ loading: false });
    }
  },

  // PUBLIC_INTERFACE
  async loadMemberships() {
    set({ loading: true });
    try {
      const data = await membershipsApi.listMemberships();
      set({ memberships: data || [] });
    } finally {
      set({ loading: false });
    }
  },

  // PUBLIC_INTERFACE
  async loadClasses() {
    set({ loading: true });
    try {
      const data = await classesApi.listClasses();
      set({ classesList: data || [] });
    } finally {
      set({ loading: false });
    }
  },

  // PUBLIC_INTERFACE
  async loadBookings() {
    set({ loading: true });
    try {
      const data = await bookingsApi.listBookings();
      set({ bookings: data || [] });
    } finally {
      set({ loading: false });
    }
  },

  // PUBLIC_INTERFACE
  async loadPayments() {
    set({ loading: true });
    try {
      const data = await paymentsApi.listPayments();
      set({ payments: data || [] });
    } finally {
      set({ loading: false });
    }
  },

  // PUBLIC_INTERFACE
  async loadProfile() {
    set({ loading: true });
    try {
      const data = await profileApi.getProfile();
      set({ profile: data || null });
    } finally {
      set({ loading: false });
    }
  },
}));
