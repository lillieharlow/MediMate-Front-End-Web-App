/*
- "Manage Profile" button for profile management
*/

import ActionButton from "./ActionButton";

function ManageProfileButton({ profileId, onManage }) {
  return (
    <ActionButton
      $bg="#2393ca"
      $color="#000"
      onClick={() => onManage(profileId)}
    >
      Manage Profile
    </ActionButton>
  );
}

export default ManageProfileButton;
