import { API_BASE_URL } from './config';

export const post = async (endpoint, body, sendToken = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Attach bearer token to header if request is to a protected route
  if (sendToken) {
    const token = localStorage.getItem('token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  // TODO: error handling
  const responseData = await response.json();
  return responseData;
};
