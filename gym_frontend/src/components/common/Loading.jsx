import React from 'react';

// PUBLIC_INTERFACE
export default function Loading({ label = 'Loading...' }) {
  /** Progress indicator for async states. */
  return <div className="loading">⏳ {label}</div>;
}
