import client from './client';
import { getEnv } from '../utils/env';

const mock = [
  { className: 'Yoga', date: '2025-01-05', status: 'Confirmed' },
  { className: 'HIIT', date: '2025-01-06', status: 'Pending' },
];

// PUBLIC_INTERFACE
export async function listBookings() {
  const { REACT_APP_FEATURE_USE_MOCKS } = getEnv();
  if (REACT_APP_FEATURE_USE_MOCKS === 'true') {
    return Promise.resolve(mock);
  }
  const { data } = await client.get('/bookings');
  return data;
}
