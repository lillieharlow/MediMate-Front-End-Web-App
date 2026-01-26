import { useState } from 'react';
import SignupForm from '../SignupForm';
import StaffUserTypeSelector from './StaffUserTypeSelector';

export default function StaffCreateUserCard({ onUserAdded }) {
  const [createUserType, setCreateUserType] = useState('patient');

  const changeUserType = userType => {
    setCreateUserType(userType);
  };

  return (
    <>
      <StaffUserTypeSelector onChangeType={changeUserType} />
      <SignupForm staffCreated userType={createUserType} onUserAdded={onUserAdded} />
    </>
  );
}
