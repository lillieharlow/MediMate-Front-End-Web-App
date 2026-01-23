/*
- "Cancel Booking" button for booking management
*/

import ActionButton from "./ActionButton";

function CancelBookingButton({ bookingId, onCancel }) {
  return (
    <ActionButton
      $bg="#c90000"
      $color="#ffffff"
      onClick={() => onCancel(bookingId)}
    >
      Cancel Booking
    </ActionButton>
  );
}

export default CancelBookingButton;
