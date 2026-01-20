// Shared booking logic for dashboard pages

// This function returns a handler that navigates to the booking page
export function createBookHandler(navigate) {
  return function handleBook() {
    navigate(`/book`);
  };
}

// PATCH request to manage a booking
export async function manageBooking(bookingId, updateData) {
  // updateData: object with fields to update
  const response = await fetch(`/api/v1/bookings/${bookingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) throw new Error("Failed to manage booking");
  return response.json();
}

// DELETE request to cancel a booking
export async function cancelBooking(bookingId) {
  const response = await fetch(`/api/v1/bookings/${bookingId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to cancel booking");
  return response.json();
}
