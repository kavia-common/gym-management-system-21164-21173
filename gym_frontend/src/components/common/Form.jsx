import React from 'react';
import { colors } from '../../theme/colors';

/**
 * Simple controlled form builder.
 * fields: [{ name, label, type='text', placeholder, required, options? }]
 * initial: object
 * onSubmit: (values) => void|Promise
 */

// PUBLIC_INTERFACE
export default function Form({ fields = [], initial = {}, onSubmit, submitLabel = 'Save' }) {
  /** Ocean-themed form */
  const [values, setValues] = React.useState({ ...initial });
  React.useEffect(() => {
    setValues({ ...initial });
  }, [initial]);

  const handleChange = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit?.(values);
  };

  const inputStyle = {
    padding: '.6rem .65rem',
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    width: '100%',
    fontSize: '.95rem',
  };
  const labelStyle = { fontWeight: 600, marginBottom: '.35rem' };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '.8rem' }}>
      {fields.map((f) => (
        <div key={f.name} style={{ display: 'grid' }}>
          <label htmlFor={f.name} style={labelStyle}>
            {f.label} {f.required ? '*' : ''}
          </label>
          {f.type === 'select' ? (
            <select
              id={f.name}
              value={values[f.name] ?? ''}
              onChange={(e) => handleChange(f.name, e.target.value)}
              required={f.required}
              style={inputStyle}
            >
              <option value="" disabled>
                {f.placeholder || 'Select...'}
              </option>
              {(f.options || []).map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={f.name}
              type={f.type || 'text'}
              placeholder={f.placeholder}
              required={f.required}
              value={values[f.name] ?? ''}
              onChange={(e) => handleChange(f.name, e.target.value)}
              style={inputStyle}
            />
          )}
        </div>
      ))}
      <div style={{ display: 'flex', gap: '.6rem' }}>
        <button
          type="submit"
          style={{
            padding: '.6rem .9rem',
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
            background: 'rgba(30,58,138,0.08)',
            color: '#1f2937',
            cursor: 'pointer',
          }}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
