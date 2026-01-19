/*
BookButton component
- Reusable button for booking appointments
- Pass doctorId and onBook handler as props
*/
import PropTypes from "prop-types";

function BookButton({ doctorId, onBook }) {
  return (
    <button type="button" onClick={() => onBook(doctorId)}>
      BOOK
    </button>
  );
}

BookButton.propTypes = {
  doctorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onBook: PropTypes.func.isRequired,
};

export default BookButton;
