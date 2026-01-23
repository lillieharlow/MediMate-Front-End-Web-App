/*
- "Delete Account" button for profile management
*/

import { FaUserLargeSlash } from 'react-icons/fa6';
import ActionButton from './ActionButton';

function DeleteProfileButton({ profileId, onDelete }) {
  return (
    <ActionButton $bg="#c90000" $color="#ffffff" onClick={() => onDelete(profileId)} title="Delete user">
      <FaUserLargeSlash />
    </ActionButton>
  );
}

export default DeleteProfileButton;
