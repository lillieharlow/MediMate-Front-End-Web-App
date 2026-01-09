import jwt from 'jsonwebtoken';
import { HttpResponse, http } from 'msw';
import { API_BASE_URL } from '../../src/api/config';

export const handlers = [
  // Success state of auth/login route
  http.post(`${API_BASE_URL}/api/v1/auth/login`, async ({ request }) => {
    const reqJson = await request.clone().json();
    if (reqJson.email !== 'ok-email@example.com') {
      throw HttpResponse.json({ success: false, message: "Invalid test credentials" }, { status: 401 });
    }

    const mockJwt = jwt.sign(
      { userId: '123', email: 'test@email.com', userType: 'patient' },
      'MockSecretKey123!',
      {
        expiresIn: '1h',
      },
    );
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
];
