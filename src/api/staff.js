import { getApiResponse } from './apiUtils';

// Get all patients
export async function getAllPatients(search = {}) {
  // Build query string from search object
  const params = Object.entries(search)
    .filter(([_, v]) => v)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  const endpoint = params ? `api/v1/staff/patients?${params}` : 'api/v1/staff/patients';
  return await getApiResponse('GET', endpoint);
}