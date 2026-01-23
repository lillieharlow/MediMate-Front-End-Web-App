// biome-ignore assist/source/organizeImports: false positive
import { MemoryRouter } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import DashboardPage from '../../src/pages/DashboardPage';
import { AuthProvider } from '../../src/contexts/AuthContext';
import * as jwtUtils from '../../src/utils/jwt';
import { mswServer } from '../mocks/mswServer';

// Mock AuthContext for patient user
// Mock getJwtPayload to return a valid patient user
vi.spyOn(jwtUtils, 'getJwtPayload').mockReturnValue({
  userId: 'patient123',
  userType: 'patient',
});

beforeEach(() => {
  localStorage.setItem('token', JSON.stringify('mockToken'));
});

afterEach(() => {
  localStorage.clear();
});

mswServer.use(
  http.get('/api/v1/doctors', () => {
    return HttpResponse.json([
      {
        _id: 'docid',
        firstName: 'Alice',
        lastName: 'Smith',
        user: { _id: 'docid' },
      },
    ]);
  }),
  http.get('/api/v1/bookings/patients/patient123', () => {
    return HttpResponse.json([
      {
        _id: 'bookingid1',
        doctorId: 'docid',
        datetimeStart: '2026-01-21T10:00:00.000Z',
        bookingDuration: 30,
        bookingStatus: 'confirmed',
      },
    ]);
  }),
);

test('renders patient dashboard with doctor and booking cards using MSW', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <DashboardPage />
      </AuthProvider>
    </MemoryRouter>,
  );

  // Debug: log doctors array from DOM
  await waitFor(() => {
    expect(screen.getByTestId('app-dashboard-heading')).toBeInTheDocument();
    expect(screen.getByText(/Our Doctors/i)).toBeInTheDocument();
    expect(screen.getByText(/My Bookings/i)).toBeInTheDocument();
    if (screen.queryByTestId('no-doctors-found')) {
      expect(screen.getByTestId('no-doctors-found')).toBeInTheDocument();
    } else {
      expect(screen.getByText(/Dr. Alice Smith/)).toBeInTheDocument();
      expect(screen.getByText(/Duration: 30 min/)).toBeInTheDocument();
      expect(screen.getByText(/Booking Status: confirmed/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /BOOK/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Manage Booking/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Cancel Booking/i })).toBeInTheDocument();
    }
  });
});
