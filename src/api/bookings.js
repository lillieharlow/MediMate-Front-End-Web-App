import { getApiResponse } from './apiUtils';

// Get all bookings for a patient
export async function getPatientBookings(userId) {
  return await getApiResponse('GET', `api/v1/bookings/patients/${userId}`);
}

// Get all bookings for a doctor
export async function getDoctorBookings(userId) {
  return await getApiResponse('GET', `api/v1/bookings/doctors/${userId}`);
}