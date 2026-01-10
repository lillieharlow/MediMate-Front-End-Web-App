import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../src/contexts/AuthContext';
import AppRoutes from '../src/router/AppRoutes';

export const renderWithAuth = ui => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

export const renderWithAll = (ui, routerPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[routerPath]}>
      <AuthProvider>
        <AppRoutes>{ui}</AppRoutes>
      </AuthProvider>
    </MemoryRouter>,
  );
};
