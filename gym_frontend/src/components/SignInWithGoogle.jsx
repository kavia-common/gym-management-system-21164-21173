import React from 'react';
import { getEnv } from '../utils/env';

/**
 * PUBLIC_INTERFACE
 * A simple Google sign-in button that performs a full-page redirect to the backend OAuth endpoint.
 * This avoids loading any Google Identity iframes/scripts on the frontend, preventing
 * ERR_BLOCKED_BY_RESPONSE or privacy-tool blocking of accounts.google.com iframes.
 *
 * Note: REACT_APP_GOOGLE_CLIENT_ID is optional and not required for redirect-only flow.
 */
export default function SignInWithGoogle({ style = {}, onClick }) {
  const { REACT_APP_GOOGLE_CLIENT_ID } = getEnv(); // optional; not used for redirect-only
  const backendBase = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
  const redirectUrl = `${backendBase}/auth/google`;

  const handleClick = (e) => {
    if (onClick) onClick(e);
    // default behavior is to hard redirect to backend OAuth start
    if (!e.defaultPrevented) {
      window.location.href = redirectUrl;
    }
  };

  const btnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.5rem',
    width: '100%',
    padding: '.75rem 1rem',
    borderRadius: '999px',
    border: '1px solid var(--color-primary)',
    background: 'var(--color-primary)',        // #1E3A8A
    color: '#fff',
    fontWeight: 600,
    boxShadow: 'var(--shadow-sm)',
    cursor: 'pointer',
    transition: 'background .2s ease, transform .05s ease',
  };

  const hoverStyle = {
    background: '#1b357d',
  };

  const [isHover, setIsHover] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);

  const computedStyle = {
    ...btnStyle,
    ...(isHover ? hoverStyle : {}),
    ...(isFocus ? { boxShadow: '0 0 0 3px rgba(245,158,11,0.35)' } : {}), // amber focus ring
    ...style,
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      style={computedStyle}
      aria-label="Continue with Google"
    >
      {/* Minimal Google-like icon representation without loading remote assets */}
      <span
        aria-hidden="true"
        style={{
          width: 18,
          height: 18,
          borderRadius: 2,
          background:
            'conic-gradient(from 45deg, #4285F4 0 25%, #34A853 0 50%, #FBBC05 0 75%, #EA4335 0 100%)',
          display: 'inline-block',
        }}
      />
      <span>Continue with Google</span>
      {/* Optional hint to indicate env presence; not required for redirect-only flow */}
      {REACT_APP_GOOGLE_CLIENT_ID ? (
        <span className="text-muted" style={{ marginLeft: '.25rem', fontSize: '.85rem' }}>(client ready)</span>
      ) : null}
    </button>
  );
}
