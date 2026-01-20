/*
ViewBookingsButton component
- Button for viewing a patient's bookings
- Pass patientId and onView handler as props
*/
import PropTypes from "prop-types";

function ViewBookingsButton({ patientId, onView }) {
  return (
    <button type="button" onClick={() => onView(patientId)}>
      View Bookings
    </button>
  );
}

ViewBookingsButton.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onView: PropTypes.func.isRequired,
};

export default ViewBookingsButton;
