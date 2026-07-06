import schedule from './schedule.json';
import classes from './classes.json';
import instructors from './instructors.json';
import pricing from './pricing.json';

const routes = {
  'schedule': () => schedule,
  'classes': () => classes,
  'instructors': () => instructors,
  'pricing': () => pricing,
  'profile/bookings': () => [],
  'health': () => ({ status: 'ok', mode: 'mock' }),
};

export async function mockFetch(path, options = {}) {
  await new Promise((r) => setTimeout(r, 200));

  const key = path.replace(/^\//, '').split('?')[0];
  const handler = routes[key];

  if (!handler) {
    throw new Error(`Mock route not found: ${key}`);
  }

  if (options.method && options.method !== 'GET') {
    return { ok: true, id: `mock-${Date.now()}` };
  }

  return handler();
}
