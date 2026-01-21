/* Staff Routes: Staff profile and management endpoints
 * 
 * - PATCH /api/v1/staff/userType/:userId       : Change user type (staff only)
 * - POST /api/v1/staff                         : Create staff profile (staff only)
 * - GET /api/v1/staff/:userId                  : Get staff by userId (staff only)
 * - GET /api/v1/staff                          : List all staff (staff only)
 * - GET /api/v1/staff/patients                 : List all patients (staff only)
 * - GET /api/v1/staff/users                    : List all users of any type (staff only)
 * - PATCH /api/v1/staff/:userId                : Update staff profile (staff only)
 * - DELETE /api/v1/staff/:userId               : Delete staff (staff only)
 */

import { getApiResponse } from './apiUtils';

// Change user type
export async function changeUserType(userId, userTypeData) {
  return await getApiResponse('PATCH', `api/v1/staff/userType/${userId}`, userTypeData, true);
}

// Create staff profile
export async function createStaffProfile(staffData) {
  return await getApiResponse('POST', 'api/v1/staff', staffData, true);
}

// Get staff by userId
export async function getStaffById(userId) {
  return await getApiResponse('GET', `api/v1/staff/${userId}`, undefined, true);
}

// List all staff
export async function getAllStaff() {
  return await getApiResponse('GET', 'api/v1/staff', undefined, true);
}

// List all patients
export async function getAllPatients(search = {}) {
  const params = Object.entries(search)
    .filter(([_, v]) => v)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  const endpoint = params ? `api/v1/staff/patients?${params}` : 'api/v1/staff/patients';
  return await getApiResponse('GET', endpoint, undefined, true);
}

// List all users of any type
export async function getAllUsers() {
  return await getApiResponse('GET', 'api/v1/staff/users', undefined, true);
}

// Update staff profile
export async function updateStaff(userId, updateData) {
  return await getApiResponse('PATCH', `api/v1/staff/${userId}`, updateData, true);
}

// Delete staff
export async function deleteStaff(userId) {
  return await getApiResponse('DELETE', `api/v1/staff/${userId}`, undefined, true);
}