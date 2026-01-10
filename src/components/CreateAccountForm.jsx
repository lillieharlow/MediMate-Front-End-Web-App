import styled from 'styled-components';
import { Card } from '../style/componentStyles';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    > label {
      font-weight: bold;
    }
    > #login-error-span {
      color: red;
    }
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

export default function CreateAccountForm() {
  return (
    <Card>
      <h2 data-testid="app-signup-heading">Create Account</h2>
    </Card>
  );
}
