import { API_BASE_URL } from './apiConfig';

export const getApiResponse = async (method, endpoint, body, sendToken = false) => {
  const methods = ['GET', 'POST', 'PATCH', 'DELETE'];
  if (!methods.includes(method)) throw new Error('Method not recognised');

  const headers = {
    'Content-Type': 'application/json',
  };

  // Attach bearer token to header if request is to a protected route
  if (sendToken) {
    const token = localStorage.getItem('token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: method,
    headers,
    body: JSON.stringify(body),
  });
  // TODO: error handling
  const responseData = await response.json();
  return responseData;
};

export const getErrorReason = apiResponse => {
  const errorsString = Array.isArray(apiResponse.errors)
    ? apiResponse.errors
        .map(e => e?.msg)
        .filter(Boolean)
        .join(', ')
    : undefined;

  return (
    errorsString || apiResponse.error || apiResponse.name || apiResponse.message || 'Unknown error'
  );
};
