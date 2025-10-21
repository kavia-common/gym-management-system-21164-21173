import React from 'react';
import { colors } from '../../theme/colors';

/**
 * Generic Table component.
 * columns: [{ key, header, render?: (row) => node }]
 * data: array of objects
 * onRowClick?: (row) => void
 * actions?: (row) => ReactNode
 */

// PUBLIC_INTERFACE
export default function Table({ columns = [], data = [], onRowClick, actions }) {
  /** Ocean-themed table */
  const th = {
    textAlign: 'left',
    fontWeight: 700,
    fontSize: '.9rem',
    color: colors.text,
    borderBottom: `1px solid ${colors.border}`,
    padding: '.65rem .6rem',
    background: '#fafafa',
  };
  const td = {
    padding: '.65rem .6rem',
    borderBottom: `1px solid ${colors.border}`,
    color: '#374151',
    fontSize: '.92rem',
  };
  const rowHover = {
    cursor: onRowClick ? 'pointer' : 'default',
  };

  return (
    <div
      style={{
        overflow: 'auto',
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        background: colors.surface,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={th}>
                {c.header}
              </th>
            ))}
            {actions && <th style={th}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} style={{ ...td, color: colors.muted }}>
                No records found.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id || JSON.stringify(row)}
                style={rowHover}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((c) => (
                  <td key={c.key} style={td}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
                {actions && <td style={td}>{actions(row)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
