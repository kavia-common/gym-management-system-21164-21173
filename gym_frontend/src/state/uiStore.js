import { create } from 'zustand';

// PUBLIC_INTERFACE
export const useUIStore = create((set) => ({
  sidebarOpen: false,
  // PUBLIC_INTERFACE
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
