/*
- "Manage Booking" button for booking management
*/

import ActionButton from "./ActionButton";

function ManageBookingButton({ bookingId, onManage }) {
  return (
    <ActionButton
      $bg="#2393ca"
      $color="#000000"
      onClick={() => onManage(bookingId)}
      style={{ fontSize: "0.85rem" }}
    >
      Manage Booking
    </ActionButton>
  );
}

export default ManageBookingButton;
