/** biome-ignore-all lint/a11y/noLabelWithoutControl: Ignored due to use of custom InputField component */
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import styled from 'styled-components';
import { loginRequest } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
import { Card, StyledForm } from '../style/componentStyles';
import { getJwtPayload } from '../utils/jwt';

const ErrorSpan = styled.span`
  color: red;
`;

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

export default function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const handleLoginSubmit = async event => {
    event.preventDefault();
    setError(null);

    try {
      const { token } = await loginRequest({ email, password });
      const payload = getJwtPayload(token);

      if (!payload) throw new Error('Invalid token');

      login({ userId: payload.userId, userType: payload.userType, token });
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <Card>
      <h2>Log In</h2>
      <StyledForm onSubmit={handleLoginSubmit} data-testid="app-login-form">
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
            placeholder="Enter your password"
            required
            data-testid="app-login-form-input-password"
          />
        </label>
        <ErrorSpan id="login-error-span">{error || ''}</ErrorSpan>
        <button type="submit" data-testid="app-login-form-button-submit">
          Log In
        </button>
      </StyledForm>
    </Card>
  );
}
