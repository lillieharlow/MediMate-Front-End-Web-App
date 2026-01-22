/*
- "Delete Account" button for profile management
*/

import ActionButton from "./ActionButton";

function DeleteProfileButton({ profileId, onDelete }) {
  return (
    <ActionButton
      $bg="#c90000"
      $color="#ffffff"
      onClick={() => onDelete(profileId)}
    >
      Delete Account
    </ActionButton>
  );
}

export default DeleteProfileButton;
