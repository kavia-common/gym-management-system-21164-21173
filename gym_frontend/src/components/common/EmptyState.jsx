import React from 'react';

// PUBLIC_INTERFACE
export default function EmptyState({ title = 'Nothing here', description = 'Try adjusting your filters or add new items.' }) {
  /** Empty state shown when no data available. */
  return (
    <div className="empty">
      <h3 style={{ marginBottom: '.25rem' }}>{title}</h3>
      <div className="text-muted">{description}</div>
    </div>
  );
}
