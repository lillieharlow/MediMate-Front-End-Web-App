// Get all bookings for a patient
export async function getPatientBookings(userId) {
  const response = await fetch(`/api/v1/bookings/patients/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch patient bookings');
  return response.json();
}

// Get all bookings for a doctor
export async function getDoctorBookings(userId) {
  const response = await fetch(`/api/v1/bookings/doctors/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch doctor bookings');
  return response.json();
}