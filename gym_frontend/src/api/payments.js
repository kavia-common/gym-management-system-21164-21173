import client from './client';
import { getEnv } from '../utils/env';

const mock = [
  { date: '2025-01-01', amount: 39.99, method: 'Card', status: 'Paid' },
  { date: '2025-01-15', amount: 19.99, method: 'Card', status: 'Paid' },
];

// PUBLIC_INTERFACE
export async function listPayments() {
  const { REACT_APP_FEATURE_USE_MOCKS } = getEnv();
  if (REACT_APP_FEATURE_USE_MOCKS === 'true') {
    return Promise.resolve(mock);
  }
  const { data } = await client.get('/payments');
  return data;
}
