/*
- "BOOK" button for navigating to the booking page
*/

import { useNavigate } from "react-router";
import ActionButton from "./ActionButton";

function BookButton({ patientId }) {
  const navigate = useNavigate();
  return (
    <ActionButton
      type="button"
      onClick={() => navigate(`/patients/${patientId}/bookings/create`)}
    >
      Create Booking
    </ActionButton>
  );
}

export default BookButton;
