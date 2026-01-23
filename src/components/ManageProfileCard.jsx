/** biome-ignore-all lint/a11y/noLabelWithoutControl: Ignored due to use of custom InputField component */
import { useEffect, useState } from 'react';
import { getDoctorById, updateDoctor } from '../api/doctor';
import { getPatientById, updatePatient } from '../api/patient';
import { getStaffById, updateStaff } from '../api/staff';
import { FormErrorSpan, StyledForm, StyledInput } from '../style/componentStyles';

export default function ManageProfileCard({ userInfo, onProfileUpdated }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shiftStart, setShiftStart] = useState('');
  const [shiftEnd, setShiftEnd] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const handleManageProfile = async event => {
    event.preventDefault();
    setIsError(false);
    setMessage('');

    // Validate inputs here

    try {
      let res;

      if (userInfo.userType === 'patient') {
        res = await updatePatient(userInfo.userId, {
          firstName,
          middleName,
          lastName,
          dateOfBirth: dob,
          phone: phoneNumber,
        });
      }

      if (userInfo.userType === 'doctor') {
        res = await updateDoctor(userInfo.userId, {
          firstName,
          lastName,
          shiftStart,
          shiftEnd,
        });
      }

      if (userInfo.userType === 'staff') {
        res = await updateStaff(userInfo.userId, {
          firstName,
          lastName,
        });
      }
      if (!res) throw new Error('An unexpected error occured.');
      if (!res.success) throw new Error(`${res.error.message}`);
      onProfileUpdated ? onProfileUpdated(res.data) : null;
      setMessage('Profile updated succesfully!');
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let profileData = {};
      if (userInfo.userType === 'patient') {
        profileData = await getPatientById(userInfo.userId);
        setDob(profileData.dateOfBirth);
        setMiddleName(profileData.middleName ?? '');
        setPhoneNumber(profileData.phone);
      }

      if (userInfo.userType === 'doctor') {
        profileData = await getDoctorById(userInfo.userId);
      }

      if (userInfo.userType === 'staff') {
        profileData = await getStaffById(userInfo.userId);
      }

      if (!profileData) throw new Error('Error retrieving profile');

      // Set common fields
      setFirstName(profileData.firstName);
      setLastName(profileData.lastName);
    };

    fetchData();
  }, [userInfo]);

  return (
    <div data-testid="app-profile-card">
      <StyledForm onSubmit={handleManageProfile}>
        <label>
          First Name:{' '}
          <StyledInput
            type="text"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            placeholder="First name"
            required
            data-testid="app-profile-form-input-firstname"
          />
        </label>
        {userInfo.userType === 'patient' && (
          <label>
            Middle Name:{' '}
            <StyledInput
              type="text"
              value={middleName}
              onChange={event => setMiddleName(event.target.value)}
              placeholder="Middle name"
              data-testid="app-profile-form-input-middlename"
            />
          </label>
        )}
        <label>
          Last Name:{' '}
          <StyledInput
            type="text"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            placeholder="Last name"
            required
            data-testid="app-profile-form-input-lastname"
          />
        </label>
        {userInfo.userType === 'patient' && (
          <>
            <label>
              Date of Birth:{' '}
              <StyledInput
                type="date"
                value={dob}
                onChange={event => setDob(event.target.value)}
                required
                data-testid="app-profile-form-input-dob"
              />
            </label>
            <label>
              Phone Number:{' '}
              <StyledInput
                type="tel"
                value={phoneNumber}
                onChange={event => setPhoneNumber(event.target.value)}
                placeholder="Phone #"
                required
                data-testid="app-profile-form-input-phone"
              />
            </label>
          </>
        )}
        {userInfo.userType === 'doctor' && (
          <>
            <label>
              Shift Start:{' '}
              <StyledInput
                type="time"
                value={shiftStart}
                onChange={event => setShiftStart(event.target.value)}
                required
                data-testid="app-profile-form-input-shift-start"
              />
            </label>
            <label>
              Shift End:{' '}
              <StyledInput
                type="time"
                value={shiftEnd}
                onChange={event => setShiftEnd(event.target.value)}
                placeholder="Phone #"
                required
                data-testid="app-profile-form-input-shift-end"
              />
            </label>
          </>
        )}

        <FormErrorSpan id="login-error-span" className={isError ? 'error' : ''}>
          {message}
        </FormErrorSpan>
        <button type="submit" data-testid="app-profile-form-button-submit">
          Save Changes
        </button>
      </StyledForm>
    </div>
  );
}
