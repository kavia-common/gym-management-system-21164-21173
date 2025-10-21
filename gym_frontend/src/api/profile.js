import client from './client';
import { getEnv } from '../utils/env';

const mock = { name: 'Demo User', email: 'demo@example.com', memberSince: '2022-05-01' };

// PUBLIC_INTERFACE
export async function getProfile() {
  const { REACT_APP_FEATURE_USE_MOCKS } = getEnv();
  if (REACT_APP_FEATURE_USE_MOCKS === 'true') {
    return Promise.resolve(mock);
  }
  const { data } = await client.get('/profile');
  return data;
}
