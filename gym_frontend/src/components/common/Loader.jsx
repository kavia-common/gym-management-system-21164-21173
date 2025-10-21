import React from 'react';
import { colors } from '../../theme/colors';

// PUBLIC_INTERFACE
export default function Loader({ text = 'Loading...' }) {
  /** Simple themed loader */
  return (
    <div
      role="status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.5rem',
        color: colors.muted,
        fontSize: '.95rem',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          border: `2px solid ${colors.border}`,
          borderTopColor: colors.primary,
          animation: 'spin 0.9s linear infinite',
          display: 'inline-block',
        }}
      />
      <span>{text}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
