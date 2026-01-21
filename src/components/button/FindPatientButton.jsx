/*
FindPatientButton component
- Button for triggering patient search
- Pass onFind handler as prop
*/
import PropTypes from "prop-types";

function FindPatientButton({ onFind }) {
  return (
    <button type="button" onClick={onFind}>
      Find Patient
    </button>
  );
}

FindPatientButton.propTypes = {
  onFind: PropTypes.func.isRequired,
};

export default FindPatientButton;
