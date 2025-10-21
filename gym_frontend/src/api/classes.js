import client from './client';
import { getEnv } from '../utils/env';

const mock = [
  { name: 'Yoga', trainer: 'Alice', time: '09:00', spots: 10 },
  { name: 'HIIT', trainer: 'Bob', time: '12:00', spots: 6 },
  { name: 'Spinning', trainer: 'Chris', time: '18:00', spots: 4 },
];

// PUBLIC_INTERFACE
export async function listClasses() {
  const { REACT_APP_FEATURE_USE_MOCKS } = getEnv();
  if (REACT_APP_FEATURE_USE_MOCKS === 'true') {
    return Promise.resolve(mock);
  }
  const { data } = await client.get('/classes');
  return data;
}
