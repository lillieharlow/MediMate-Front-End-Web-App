/** biome-ignore-all lint/a11y/noLabelWithoutControl: Ignored due to use of custom InputField component */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { loginRequest } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
import { DialogCard, FormErrorSpan, StyledForm, StyledInput } from '../style/componentStyles';
import { getJwtPayload } from '../utils/jwt';

export default function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async event => {
    event.preventDefault();
    setMessage('');
    setIsError(null);

    try {
      const { token } = await loginRequest({ email, password });
      const payload = getJwtPayload(token);

      if (!payload) throw new Error('Invalid token');

      login({ userId: payload.userId, userType: payload.userType, token });
      navigate('/dashboard');
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      console.log(error);
    }
  };

  return (
    <DialogCard>
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
        <FormErrorSpan id="login-error-span" className={isError ? 'error' : ''}>
          {message}
        </FormErrorSpan>
        <button type="submit" data-testid="app-login-form-button-submit">
          Log In
        </button>
      </StyledForm>
    </DialogCard>
  );
}
