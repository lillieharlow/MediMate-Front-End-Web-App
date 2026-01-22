/*
ViewBookingsButton component
- Button for viewing a patient's bookings
- Pass patientId as prop
*/
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

function ViewBookingsButton({ patientId }) {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(`/patients/${patientId}/bookings`)}>
      View Bookings
    </button>
  );
}

ViewBookingsButton.propTypes = {
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ViewBookingsButton;
