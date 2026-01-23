/*
- "View Bookings" button for viewing a patient's bookings
*/
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";

function ViewBookingsButton({ patientId }) {
  const navigate = useNavigate();
  return (
    <ActionButton
      $bg="#388bff"
      $color="#000000"
      type="button"
      onClick={() => navigate(`/patients/${patientId}/bookings`)}
    >
      View Bookings
    </ActionButton>
  );
}

export default ViewBookingsButton;
