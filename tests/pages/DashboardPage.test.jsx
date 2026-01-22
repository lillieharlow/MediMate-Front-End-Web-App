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
        id: 1,
        image: 'doc1.jpg',
        title: 'Dr. Smith',
        subtitle: 'Cardiologist',
        info: 'Available',
      },
    ]);
  }),
  http.get('/api/v1/bookings/patients/patient123', () => {
    return HttpResponse.json([
      {
        id: 1,
        icon: 'booking.png',
        title: 'Checkup',
        info: 'Tomorrow at 10am',
        date: '2026-01-21',
        time: '10:00',
        doctorName: 'Dr. Smith',
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

  // Wait for doctor and booking cards to appear
  await waitFor(() => {
    expect(screen.getByTestId('app-dashboard-heading')).toBeInTheDocument();
    expect(screen.getByText(/Our Doctors/i)).toBeInTheDocument();
    expect(screen.getByText(/My Bookings/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Dr. alice smith/i)).toHaveLength(2);
    expect(screen.getByText(/follow-up/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'BOOK' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: /Manage Booking/i })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /Cancel Booking/i })).toHaveLength(2);
  });
});
