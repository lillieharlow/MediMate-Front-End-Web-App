/*
- "Edit User Type" button for profile management
*/

import { FaUserPlus } from 'react-icons/fa';
import ActionButton from './ActionButton';

function AddUserButton({ profileId, onAddUser }) {
  return (
    <ActionButton onClick={() => onAddUser(profileId)} title="Create new user">
      <FaUserPlus />
    </ActionButton>
  );
}

export default AddUserButton;
