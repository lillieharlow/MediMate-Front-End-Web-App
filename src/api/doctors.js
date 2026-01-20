// Get all doctors
export async function getAllDoctors() {
  const response = await fetch('/api/v1/doctors');
  if (!response.ok) throw new Error('Failed to fetch doctors');
  return response.json();
}