import { useAuthStore } from '../state/authStore';

// PUBLIC_INTERFACE
export function isAuthenticated() {
  /** Returns true if a token exists. */
  return !!useAuthStore.getState().token;
}
