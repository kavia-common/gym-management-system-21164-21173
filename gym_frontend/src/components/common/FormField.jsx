import React from 'react';

// PUBLIC_INTERFACE
export default function FormField({ label, children }) {
  /** Basic form field wrapper. */
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {children}
    </div>
  );
}
