/** biome-ignore-all lint/a11y/noLabelWithoutControl: Ignored due to use of custom InputField component */

import { useState } from 'react';
import styled from 'styled-components';
import { Card, FormErrorSpan, StyledForm } from '../style/componentStyles';

// TODO: Update styling for input to reflect front-end validation once done
const StyledInput = styled.input`
  padding: 0.2rem;
  border-radius: 4px;
  outline: none;
  border: 1px solid rgba(204, 204, 204, 0.5);

  &:focus {
    border: 1.5px solid rgba(0, 123, 255, 0.5);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    color: black;
  }
`;

export default function CreateAccountForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignupSubmit = event => {
    event.preventDefault();
    setError(null);
  };
  return (
    <Card>
      <h2 data-testid="app-signup-heading">Create Account</h2>
      <StyledForm onSubmit={handleSignupSubmit} data-testid="app-signup-form">
        <label>
          Email:{' '}
          <StyledInput
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            data-testid="app-login-form-input-email"
          />
        </label>
        <label>
          Password:{' '}
          <StyledInput
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Choose your password"
            required
            data-testid="app-login-form-input-password"
          />
        </label>
        <FormErrorSpan id="login-error-span">{error || ''}</FormErrorSpan>
        <button type="submit" data-testid="app-login-form-button-submit">
          Log In
        </button>
      </StyledForm>
    </Card>
  );
}
