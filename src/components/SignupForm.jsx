/** biome-ignore-all lint/a11y/noLabelWithoutControl: Ignored due to use of custom InputField component */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signupRequest } from '../api/auth';
import {
  DialogCard,
  FormErrorSpan,
  InputGrid,
  StyledForm,
  StyledInput,
} from '../style/componentStyles';

// TODO: Update styling for input to reflect front-end validation once done

export default function SignupForm({ userType = 'patient', staffCreated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [shiftStart, setShiftStart] = useState('');
  const [shiftEnd, setShiftEnd] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignupSubmit = async event => {
    event.preventDefault();
    setIsError(false);
    setMessage('');

    try {
      if (password !== confirmPassword)
        throw new Error('Confirm password must be the same as password!');

      const signupSuccess = await signupRequest({
        email,
        password,
        firstName,
        middleName,
        lastName,
        dateOfBirth: dob,
        phone,
      });

      if (signupSuccess) {
        setMessage(
          staffCreated
            ? 'Account created'
            : 'Patient account created! Redirecting to login page...',
        );
        if (staffCreated) return;
        setTimeout(
          () => {
            navigate('/login');
          },
          1000 * 3, //3 seconds
        );
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
  };
  return (
    <DialogCard>
      <h2 data-testid="app-signup-heading">Create Account</h2>
      <StyledForm onSubmit={handleSignupSubmit} data-testid="app-signup-form">
        <InputGrid>
          <label htmlFor="signup-email">Email:</label>
          <StyledInput
            id="signup-email"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder={staffCreated ? 'Enter email' : 'Enter your email'}
            required
            data-testid="app-signup-form-input-email"
          />

          <label htmlFor="signup-password">Password:</label>
          <StyledInput
            id="signup-password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder={staffCreated ? 'Enter password' : 'Choose your password'}
            required
            data-testid="app-signup-form-input-password"
          />

          <label htmlFor="signup-confirm-password">Confirm Password:</label>
          <StyledInput
            id="signup-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            placeholder={staffCreated ? 'Re-type password' : 'Re-type your password'}
            required
            data-testid="app-signup-form-input-password-confirm"
          />

          <label htmlFor="signup-firstname">First Name:</label>
          <StyledInput
            id="signup-firstname"
            type="text"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            placeholder={staffCreated ? 'User first name' : 'Your first name'}
            required
            data-testid="app-signup-form-input-firstname"
          />
          {userType === 'patient' && (
            <>
              <label htmlFor="signup-middlename">Middle Name:</label>
              <StyledInput
                id="signup-middlename"
                type="text"
                value={middleName}
                onChange={event => setMiddleName(event.target.value)}
                placeholder={staffCreated ? 'User middle name' : 'Your middle name'}
                data-testid="app-signup-form-input-middlename"
              />
            </>
          )}

          <label htmlFor="signup-lastname">Last Name:</label>
          <StyledInput
            id="signup-lastname"
            type="text"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            placeholder={staffCreated ? 'User last name' : 'Your last/family name'}
            data-testid="app-signup-form-input-lastname"
          />
          {userType === 'patient' && (
            <>
              <label htmlFor="signup-dob">Date of Birth:</label>
              <StyledInput
                id="signup-dob"
                type="date"
                value={dob}
                onChange={event => setDob(event.target.value)}
                data-testid="app-signup-form-input-dob"
              />

              <label htmlFor="signup-phone">Phone Number:</label>
              <StyledInput
                id="signup-phone"
                type="tel"
                value={phone}
                onChange={event => setPhone(event.target.value)}
                placeholder={staffCreated ? 'Phone #' : 'Your mobile / landline'}
                data-testid="app-signup-form-input-phone"
              />
            </>
          )}
          {userType === 'doctor' && (
            <>
              <label htmlFor="signup-shiftstart">Shift Start Time:</label>
              <StyledInput
                id="signup-shiftstart"
                type="time"
                value={shiftStart}
                required
                onChange={event => setShiftStart(event.target.value)}
                data-testid="app-signup-form-input-shiftstart"
              />
              <label htmlFor="signup-shiftend">Shift End Time:</label>
              <StyledInput
                id="signup-shiftend"
                type="time"
                value={shiftEnd}
                required
                onChange={event => setShiftEnd(event.target.value)}
                data-testid="app-signup-form-input-shiftend"
              />
            </>
          )}
        </InputGrid>

        <FormErrorSpan id="signup-error-span" className={isError ? 'error' : ''}>
          {message}
        </FormErrorSpan>
        <button type="submit" data-testid="app-signup-form-button-submit">
          Create Account
        </button>
      </StyledForm>
    </DialogCard>
  );
}
