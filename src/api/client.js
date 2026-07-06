import axios from 'axios';
import { useMock } from '../utils/runtimeMode.js';
import { ensureAuth, authHeaders } from '../stores/authStore.js';
import { mockFetch } from './mock/index.js';

const baseURL = import.meta.env.VITE_API_URL || '/api';

const http = axios.create({ baseURL, timeout: 30000 });

function usesLiveHttp(options = {}) {
  return !useMock || Boolean(options.real);
}

function usesMockFetch(options = {}) {
  return useMock && !options.real;
}

async function authorizedConfig(options = {}) {
  if (!usesLiveHttp(options)) return options;
  const token = await ensureAuth();
  return {
    ...options,
    headers: {
      ...options.headers,
      ...authHeaders(token),
    },
  };
}

export async function apiGet(path, options = {}) {
  if (usesMockFetch(options)) {
    return mockFetch(path.replace(/^\//, ''), options);
  }
  const { data } = await http.get(path, await authorizedConfig(options));
  return data;
}

export async function apiPost(path, body, options = {}) {
  if (usesMockFetch(options)) {
    return mockFetch(path.replace(/^\//, ''), { ...options, method: 'POST', body });
  }
  const response = await http.post(path, body, await authorizedConfig(options));
  if (response.status === 204) return null;
  return response.data;
}

export { useMock };

export function apiOptions() {
  return useMock ? {} : { real: true };
}
