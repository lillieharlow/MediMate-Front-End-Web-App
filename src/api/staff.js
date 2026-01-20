// Get all patients
export async function getAllPatients() {
  const response = await fetch('/api/v1/staff/patients');
  if (!response.ok) throw new Error('Failed to fetch patients');
  return response.json();
}