import jwt from "jsonwebtoken";
import { HttpResponse, http } from "msw";
import { API_BASE_URL } from "../../src/api/config";

export const handlers = [
  // Login route success & fail state
  http.post(`${API_BASE_URL}/api/v1/auth/login`, async ({ request }) => {
    const reqJson = await request.clone().json();
    if (reqJson.email !== "ok-email@example.com") {
      throw HttpResponse.json(
        { success: false, message: "Invalid test credentials" },
        { status: 401 }
      );
    }

    const mockJwt = jwt.sign(
      { userId: "123", email: "test@email.com", userType: "patient" },
      "MockSecretKey123!",
      {
        expiresIn: "1h",
      }
    );
    return HttpResponse.json(
      {
        success: true,
        token: mockJwt,
      },
      {
        status: 200,
      }
    );
  }),
  http.post(`${API_BASE_URL}/api/v1/auth/signup`, async ({ request }) => {
    const reqJson = await request.clone().json();
    if (reqJson.email === "bad-email@example.com") {
      throw HttpResponse.json(
        { success: false, message: "Invalid test signup" },
        { status: 401 }
      );
    }

    if (reqJson.email === "duplicate@example.com") {
      throw HttpResponse.json(
        { success: false, message: "Test email already in use" },
        { status: 409 }
      );
    }

    return HttpResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  }),
];
