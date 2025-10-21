const currency = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });

// PUBLIC_INTERFACE
export function formatCurrency(value) {
  /** Formats a number as currency. */
  return currency.format(Number(value || 0));
}
