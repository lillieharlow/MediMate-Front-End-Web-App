// Shared booking logic for dashboard pages

// This function returns a handler that navigates to the booking page
export function createBookHandler(navigate, userId) {
  return function handleBook() {
    // Navigate to the patient create booking page
    navigate(`/patients/${userId}/bookings/create`);
  };
}

