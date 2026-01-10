import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../src/contexts/AuthContext';
import AppRoutes from '../src/router/AppRoutes';

export const renderWithAll = ui => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <AppRoutes>{ui}</AppRoutes>
      </AuthProvider>
    </MemoryRouter>,
  );
};
