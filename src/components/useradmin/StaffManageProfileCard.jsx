import { useState } from 'react';
import ManageProfileCard from '../ManageProfileCard';
import StaffUserTypeSelector from './StaffUserTypeSelector';

export default function StaffManageProfileCard({ userInfo, onProfileUpdated }) {
  const initialUserType = userInfo.userType;
  const [userType, setUserType] = useState(initialUserType);
  const [userTypeChanged, setUserTypeChanged] = useState(false);

  const changeUserType = userType => {
    setUserType(userType);
    setUserTypeChanged(userType !== initialUserType)
  };

  return (
    <>
      <h2>Edit User Profile</h2>
      <StaffUserTypeSelector onChangeType={changeUserType} />
      <br />
      <ManageProfileCard userInfo={{ ...userInfo, userType }} onProfileUpdated={onProfileUpdated} userTypeChanged={userTypeChanged} />
    </>
  );
}
