import React from 'react';

// PUBLIC_INTERFACE
export default function Card({ title, actions, children }) {
  /** Simple card with optional title and action area. */
  return (
    <section className="card">
      {(title || actions) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <div>{actions}</div>
        </div>
      )}
      {children}
    </section>
  );
}
