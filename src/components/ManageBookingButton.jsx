/*
ManageBookingButton component
- "Manage Booking" button for booking management
- Pass bookingId and onManage handler as props
*/

import PropTypes from "prop-types";

function ManageBookingButton({ bookingId, onManage }) {
  return (
    <button type="button" onClick={() => onManage(bookingId)}>
      Manage Booking
    </button>
  );
}

ManageBookingButton.propTypes = {
  bookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onManage: PropTypes.func.isRequired,
};

export default ManageBookingButton;
