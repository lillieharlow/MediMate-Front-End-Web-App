/*
CreateBookingButton component
- Button for creating a booking for a patient
- Pass patientId as prop
*/
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CreateBookingButton({ patientId }) {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(`/patients/${patientId}/bookings/create`)}>
      Create Booking
    </button>
  );
}

CreateBookingButton.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CreateBookingButton;
