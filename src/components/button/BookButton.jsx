/*
BookButton component
- "BOOK" button for navigating to the booking page
- Pass onBook handler as prop
*/

import PropTypes from "prop-types";

function BookButton({ onBook }) {
  return (
    <button
      type="button"
      onClick={onBook}
      style={{
        backgroundColor: "#008533",
        fontWeight: "bold",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "48px",
        height: "48px",
      }}
    >
      BOOK
    </button>
  );
}

BookButton.propTypes = {
  onBook: PropTypes.func.isRequired,
};

export default BookButton;
