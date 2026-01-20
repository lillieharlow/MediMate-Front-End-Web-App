/*
CreateBookingButton component
- Button for creating a booking for a patient
- Pass patientId and onCreate handler as props
*/
import PropTypes from "prop-types";

function CreateBookingButton({ patientId, onCreate }) {
  return (
    <button type="button" onClick={() => onCreate(patientId)}>
      Create Booking
    </button>
  );
}

CreateBookingButton.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreateBookingButton;
