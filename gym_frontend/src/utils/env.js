const read = (key, fallback = '') => {
  const v = process.env[key];
  return (v === undefined || v === null || v === '') ? fallback : v;
};

// PUBLIC_INTERFACE
export function getEnv() {
  /** Reads env from CRA or Vite (auto-detect public Google Client ID key). */
  // Prefer CRA style first
  const craGoogle = read('REACT_APP_GOOGLE_CLIENT_ID', '');
  // Detect Vite at runtime if available (import.meta.env) and fallback to that one
  let viteGoogle = '';
  try {
    // eslint-disable-next-line no-undef
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // eslint-disable-next-line no-undef
      viteGoogle = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
    }
  } catch (e) {
    // ignore
  }

  const GOOGLE_CLIENT_ID = craGoogle || viteGoogle || '';

  return {
    REACT_APP_API_BASE_URL: read('REACT_APP_API_BASE_URL', ''),
    REACT_APP_GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID,
    REACT_APP_GOOGLE_REDIRECT_URI: read('REACT_APP_GOOGLE_REDIRECT_URI', ''),
    REACT_APP_FEATURE_USE_MOCKS: read('REACT_APP_FEATURE_USE_MOCKS', 'true'),
    REACT_APP_FEATURE_GOOGLE_AUTH_SDK: read('REACT_APP_FEATURE_GOOGLE_AUTH_SDK', 'false'),
    REACT_APP_APP_NAME: read('REACT_APP_APP_NAME', 'Gym Manager'),
  };
}
