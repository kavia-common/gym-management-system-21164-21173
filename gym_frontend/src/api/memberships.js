import client from './client';
import { getEnv } from '../utils/env';

const mock = [
  { name: 'Basic', price: 19.99, status: 'Active' },
  { name: 'Premium', price: 39.99, status: 'Active' },
  { name: 'Student', price: 14.99, status: 'Inactive' },
];

// PUBLIC_INTERFACE
export async function listMemberships() {
  const { REACT_APP_FEATURE_USE_MOCKS } = getEnv();
  if (REACT_APP_FEATURE_USE_MOCKS === 'true') {
    return Promise.resolve(mock);
  }
  const { data } = await client.get('/memberships');
  return data;
}
