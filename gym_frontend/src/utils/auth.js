let _token = null;

/**
 * Lightweight, pluggable auth helpers (no-op by default).
 * These can be replaced later with Google OAuth or any other provider.
 */

// PUBLIC_INTERFACE
export function setToken(token) {
  /** Set current auth token (string or null). */
  _token = token || null;
}

// PUBLIC_INTERFACE
export function getToken() {
  /** Get current auth token (string or null). */
  return _token;
}

// PUBLIC_INTERFACE
export function isAuthenticated() {
  /** Boolean indicating if a token exists. */
  return Boolean(_token);
}
