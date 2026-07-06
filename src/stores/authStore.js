import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token = 'mock-token') => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      register: (user, token = 'mock-token') => set({ user, token }),
    }),
    { name: 'studio-auth' },
  ),
);

export function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function ensureAuth() {
  const { token } = useAuthStore.getState();
  return token;
}
