/*
BookButton component
- "BOOK" button for navigating to the booking page
- Pass onBook handler as prop
*/

import PropTypes from "prop-types";

function BookButton({ onBook }) {
  return (
    <button type="button" onClick={onBook}>
      BOOK
    </button>
  );
}

BookButton.propTypes = {
  onBook: PropTypes.func.isRequired,
};

export default BookButton;
