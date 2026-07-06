import { apiGet } from './client.js';

export function fetchSchedule() {
  return apiGet('/schedule');
}

export function fetchClasses() {
  return apiGet('/classes');
}

export function fetchInstructors() {
  return apiGet('/instructors');
}

export function fetchPricing() {
  return apiGet('/pricing');
}

export function fetchBookings() {
  return apiGet('/profile/bookings');
}

export function bookSession(sessionId) {
  return apiGet(`/schedule/${sessionId}/book`);
}
