import { HttpResponse, http } from 'msw';
import { API_BASE_URL } from '../../src/api/apiConfig';

export const handlers = [
  // Login route success & fail state
  http.post(`${API_BASE_URL}/api/v1/auth/login`, async ({ request }) => {
    const reqJson = await request.clone().json();
    let mockJwt;
    if (reqJson.email === 'patient@example.com') {
      // Patient user
      mockJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwidXNlclR5cGUiOiJwYXRpZW50In0.mock-signature';
    } else if (reqJson.email === 'staff@email.com') {
      // Staff user
      mockJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzdGFmZiIsImVtYWlsIjoic3RhZmZAZW1haWwuY29tIiwidXNlclR5cGUiOiJzdGFmZiJ9.mock-signature';
    } else if (reqJson.email === 'doctor@email.com') {
      // Doctor user
      mockJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkb2MxIiwiZW1haWwiOiJkb2N0b3JAZW1haWwuY29tIiwidXNlclR5cGUiOiJkb2N0b3IifQ.mock-signature';
    } else {
      throw HttpResponse.json(
        { success: false, message: 'Invalid test credentials' },
        { status: 401 },
      );
    }
    return HttpResponse.json(
      {
        success: true,
        token: mockJwt,
      },
      {
        status: 200,
      },
    );
  }),

  http.post(`${API_BASE_URL}/api/v1/auth/signup`, async ({ request }) => {
    const reqJson = await request.clone().json();
    if (reqJson.email === 'bad-email@example.com') {
      throw HttpResponse.json({ success: false, message: 'Invalid test signup' }, { status: 401 });
    }

    if (reqJson.email === 'duplicate@example.com') {
      throw HttpResponse.json(
        { success: false, message: 'Test email already in use' },
        { status: 409 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  }),

  // Mock doctors list
  http.get(`${API_BASE_URL}/api/v1/doctors`, () => {
    return HttpResponse.json({
      data: [
        {
          id: 'doc1',
          title: 'Dr. Alice Smith',
          image: '',
          subtitle: 'Cardiologist',
          info: 'Expert in heart health.',
        },
        {
          id: 'doc2',
          title: 'Dr. Bob Jones',
          image: '',
          subtitle: 'Dermatologist',
          info: 'Skin specialist.',
        },
        {
          id: 'doc3',
          title: 'Dr. Carol Lee',
          image: '',
          subtitle: 'Pediatrician',
          info: 'Child health expert.',
        },
      ],
    });
  }),

  // Mock patient bookings
  http.get(`${API_BASE_URL}/api/v1/bookings/patients/:patientId`, () => {
    return HttpResponse.json({
      data: [
        {
          id: 'b1',
          icon: '',
          title: 'Consultation',
          info: 'Routine checkup.',
          date: '2026-01-22',
          time: '09:00',
          doctorName: 'Dr. Alice Smith',
        },
        {
          id: 'b2',
          icon: '',
          title: 'Follow-up',
          info: 'Review test results.',
          date: '2026-01-23',
          time: '10:30',
          doctorName: 'Dr. Bob Jones',
        },
      ],
    });
  }),

  // Mock doctor bookings
  http.get(`${API_BASE_URL}/api/v1/bookings/doctors/:doctorId`, function handler(req) {
    const { doctorId } = req.params;
    const today = '2026-01-21';
    // Always return two bookings for doc1 for demo/testing
    if (doctorId === 'doc1') {
      return HttpResponse.json({
        data: [
          {
            id: 'b_today',
            time: '08:30',
            patientName: 'Test Patient',
            patientNotes: 'Needs follow-up.',
            appointmentNotes: 'Review new symptoms.',
            doctorId: 'doc1',
            date: today,
          },
          {
            id: 'b_today2',
            time: '10:00',
            patientName: 'Second Patient',
            patientNotes: 'Routine check.',
            appointmentNotes: 'Discuss results.',
            doctorId: 'doc1',
            date: today,
          },
        ],
      });
    }
    // Fallback for other doctors
    return HttpResponse.json({ data: [] });
  }),

  // Mock staff patients list
  http.get(`${API_BASE_URL}/api/v1/staff/patients`, () => {
    async ({ request }) => {
      // Mock patient data, IDs match booking data
      const patients = [
        {
          id: 'p1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          dob: '1990-01-01',
          phone: '555-1234',
        },
        {
          id: 'p2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          dob: '1985-05-15',
          phone: '555-5678',
        },
        {
          id: 'p3',
          firstName: 'Sam',
          lastName: 'Lee',
          email: 'sam.lee@example.com',
          dob: '2000-09-30',
          phone: '555-9012',
        },
        {
          id: 'p4',
          firstName: 'Alex',
          lastName: 'Kim',
          email: 'alex.kim@example.com',
          dob: '1995-07-12',
          phone: '555-3456',
        },
      ];
      // Await request.url if needed (for MSW v2 compatibility)
      const urlStr = typeof request.url === 'function' ? await request.url() : request.url;
      const url = new URL(urlStr);
      const filters = {
        firstName: url.searchParams.get('firstName'),
        lastName: url.searchParams.get('lastName'),
        email: url.searchParams.get('email'),
        dob: url.searchParams.get('dob'),
        phone: url.searchParams.get('phone'),
      };
      // Filter patients by non-empty query params
      const filtered = patients.filter(p => {
        return Object.entries(filters).every(([key, val]) => {
          if (!val) return true;
          return p[key].toLowerCase().includes(val.toLowerCase());
        });
      });
      return HttpResponse.json({ data: filtered });
    };
  }),

  // Mock get patient profie request
  http.get(`${API_BASE_URL}/api/v1/patients/1TestUserId`, () => {
    return HttpResponse.json({
      data: {
        firstName: 'TestFirstName',
        middleName: 'TestMiddleName',
        lastName: 'TestLastName',
        dateOfBirth: '01/01/2001',
      },
    });
  }),
];
