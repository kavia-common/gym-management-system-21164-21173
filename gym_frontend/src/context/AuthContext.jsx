import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { getEnv } from '../utils/env';

/**
 * Lightweight Auth context to expose user info and login/logout placeholders.
 * This does NOT implement token storage or backend callbacks; it's a minimal state holder
 * until the backend completes OAuth flow and returns a session/token.
 */

// PUBLIC_INTERFACE
export const AuthContext = createContext({
  /** Current authenticated user object or null. */
  user: null,
  /** Boolean indicating an auth operation in progress. */
  loading: false,
  /** Starts login (placeholder; Google Sign-In handled separately). */
  login: () => {},
  /** Logs the user out (clears state). */
  logout: () => {},
});

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to consume AuthContext. */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Provides minimal auth state and actions.
   * In this app, Google Sign-In is initiated from SignInWithGoogle component or fallback redirect to backend.
   */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { REACT_APP_APP_NAME } = getEnv();

  const login = useCallback(async () => {
    setLoading(true);
    try {
      // Placeholder login; real login handled via GSI or backend redirect.
      // We intentionally do not set user here.
      return;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // If tokens/cookies are used later, clear them here.
    // In a backend-redirect OAuth flow, the backend typically sets an httpOnly cookie;
    // logout might also require calling a backend /auth/logout endpoint to clear server-side session.
  }, []);

  const value = useMemo(
    () => ({ user, setUser, loading, login, logout, appName: REACT_APP_APP_NAME || 'Gym Manager' }),
    [user, loading, login, logout, REACT_APP_APP_NAME]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
