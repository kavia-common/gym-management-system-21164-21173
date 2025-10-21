import React from 'react';

// PUBLIC_INTERFACE
export default function Button({ children, onClick, type = 'button', variant, ...rest }) {
  /** Button with variants: primary, secondary, default. */
  const cls = ['btn', variant ? variant : ''].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
