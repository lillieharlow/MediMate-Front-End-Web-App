/*
- "Create Booking" button for creating a booking for a patient
*/
import { useNavigate } from "react-router";
import ActionButton from "./ActionButton";

function CreateBookingButton({ patientId }) {
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

export default CreateBookingButton;
