import React from 'react';

// PUBLIC_INTERFACE
export default function Badge({ children, type = 'info' }) {
  /** Badge with types: success, error, info. */
  const cls = ['badge', type].join(' ');
  return <span className={cls}>{children}</span>;
}
