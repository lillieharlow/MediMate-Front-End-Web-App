/*
CancelBookingButton component
- "Cancel Booking" button for booking management
- Pass bookingId and onCancel handler as props
*/

import PropTypes from "prop-types";

function CancelBookingButton({ bookingId, onCancel }) {
  return (
    <button type="button" onClick={() => onCancel(bookingId)}>
      Cancel Booking
    </button>
  );
}

CancelBookingButton.propTypes = {
  bookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CancelBookingButton;
