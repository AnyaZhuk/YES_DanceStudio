import { describe, expect, it } from 'vitest';
import { mockFetch } from './index.js';

describe('mock API', () => {
  it('returns schedule fixtures', async () => {
    const data = await mockFetch('schedule');
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('style');
  });

  it('returns classes fixtures', async () => {
    const data = await mockFetch('classes');
    expect(data.length).toBeGreaterThan(0);
  });
});
