/*
DeleteProfileButton component
- Pass profile ID and onManage handler as props
*/

import PropTypes from "prop-types";

function DeleteProfileButton({ profileId, onManage }) {
  return (
    <button type="button" onClick={() => onManage(profileId)}>
      Delete User
    </button>
  );
}

DeleteProfileButton.propTypes = {
  profileId: PropTypes.string.isRequired,
  onManage: PropTypes.func.isRequired,
};

export default DeleteProfileButton;
