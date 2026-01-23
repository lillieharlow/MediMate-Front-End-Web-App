import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PatientOurDoctorsCardList from '../../../src/components/dashboard/PatientOurDoctorsCardList.jsx';

describe('PatientOurDoctorsCardList', () => {
  it('renders doctor name and Book button', () => {
    const doctors = [{ _id: '1', firstName: 'Jane', lastName: 'Doe' }];
    const { BrowserRouter } = require('react-router-dom');
    render(
      <BrowserRouter>
        <PatientOurDoctorsCardList
          doctors={doctors}
          patientId="patient1"
        />
      </BrowserRouter>
    );
    expect(screen.getByText(/Dr. Jane/)).toBeInTheDocument();
    expect(screen.getByText(/Doe/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
