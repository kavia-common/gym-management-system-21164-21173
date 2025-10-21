import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getEnv } from '../utils/env';

// PUBLIC_INTERFACE
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,

      // PUBLIC_INTERFACE
      async signInWithGoogle() {
        /** Starts Google sign-in via redirect (mocked if feature disabled). */
        const { REACT_APP_FEATURE_GOOGLE_AUTH_SDK, REACT_APP_GOOGLE_REDIRECT_URI } = getEnv();
        set({ loading: true });

        if (REACT_APP_FEATURE_GOOGLE_AUTH_SDK === 'true') {
          // Minimalistic redirect-based flow: simulate redirect to Google,
          // In real integration, use Google SDK. Here we append a pretend token.
          const redirectUri = REACT_APP_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/callback`;
          const state = Math.random().toString(36).slice(2);
          localStorage.setItem('oauth_state', state);
          window.location.href = `${redirectUri}?mock_token=demo_token_${state}`;
        } else {
          // Fallback: simulate sign-in without external SDK
          setTimeout(() => {
            set({ user: { name: 'Demo User', email: 'demo@example.com' }, token: 'demo_token_local' });
            set({ loading: false });
            window.location.href = '/';
          }, 500);
        }
      },

      // PUBLIC_INTERFACE
      async handleRedirect() {
        /** Completes redirect sign-in by reading mock token from URL (or no-op). */
        const params = new URLSearchParams(window.location.search);
        const token = params.get('mock_token');
        if (token) {
          set({ token, user: { name: 'Google User', email: 'user@example.com' } });
        }
        set({ loading: false });
      },

      // PUBLIC_INTERFACE
      signOut() {
        /** Clears auth state and local storage. */
        set({ user: null, token: null });
        localStorage.removeItem('oauth_state');
      }
    }),
    { name: 'auth-store' }
  )
);
