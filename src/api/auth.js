import { API_BASE_URL } from './config';

const post = async (endpoint, body) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  // TODO: error handling
  const responseData = await response.json();
  return responseData;
};

export const loginRequest = async ({ email, password }) => {
  const loginResData = await post('api/v1/auth/login', { email, password });

  if (!loginResData.success) {
    throw new Error(
      `Login failed: ${loginResData.error || loginResData.name || loginResData.message || 'Unknown error'}`,
    );
  }
  //Unpack required items
  const returnObj = {
    userId: loginResData.userId,
    userType: loginResData.userType,
    token: loginResData.token,
  };

  return returnObj;
};
