import { getApiResponse } from './apiUtils';

// Get all doctors
export async function getAllDoctors() {
  return await getApiResponse('GET', 'api/v1/doctors');
}