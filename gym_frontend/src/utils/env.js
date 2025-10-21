const read = (key, fallback = '') => {
  const v = process.env[key];
  return (v === undefined || v === null || v === '') ? fallback : v;
};

// PUBLIC_INTERFACE
export function getEnv() {
  /** Reads all required REACT_APP_* variables with sane defaults. */
  return {
    REACT_APP_API_BASE_URL: read('REACT_APP_API_BASE_URL', ''),
    REACT_APP_GOOGLE_CLIENT_ID: read('REACT_APP_GOOGLE_CLIENT_ID', ''),
    REACT_APP_GOOGLE_REDIRECT_URI: read('REACT_APP_GOOGLE_REDIRECT_URI', ''),
    REACT_APP_FEATURE_USE_MOCKS: read('REACT_APP_FEATURE_USE_MOCKS', 'true'),
    REACT_APP_FEATURE_GOOGLE_AUTH_SDK: read('REACT_APP_FEATURE_GOOGLE_AUTH_SDK', 'false'),
    REACT_APP_APP_NAME: read('REACT_APP_APP_NAME', 'Gym Manager'),
  };
}
