import { useNavigate } from 'react-router';
import { Card } from '../style/componentStyles';

export default function CreateAccountCard() {
  const navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <Card data-testid="app-create-account-card">
      <h3 data-testid="app-create-account-card-heading">Don't have a MediMate account?</h3>
      <button
        type="button"
        onClick={handleCreateAccount}
        data-testid="app-create-account-card-button"
      >
        Create Patient Account
      </button>
    </Card>
  );
}
