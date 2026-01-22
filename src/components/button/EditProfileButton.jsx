/*
EditProfileButton component
- Pass profile ID and onManage handler as props
*/

import PropTypes from "prop-types";

function ManageProfileButton({ profileId, onManage }) {
  return (
    <button type="button" onClick={() => onManage(profileId)}>
      Manage Profile
    </button>
  );
}

ManageProfileButton.propTypes = {
  profileId: PropTypes.string.isRequired,
  onManage: PropTypes.func.isRequired,
};

export default ManageProfileButton;
