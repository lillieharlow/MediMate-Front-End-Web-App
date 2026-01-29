/*
- "View Bookings" button for viewing a patient's bookings
*/
import ActionButton from "./ActionButton";

function ViewBookingsButton({ onClick }) {
  return (
    <ActionButton
      $bg="#388bff"
      $color="#000000"
      type="button"
      onClick={onClick}
    >
      View Bookings
    </ActionButton>
  );
}

export default ViewBookingsButton;
