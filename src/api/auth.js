import { getApiResponse, getErrorReason } from './apiUtils';

export const loginRequest = async ({ email, password }) => {
  const loginResData = await getApiResponse('POST', 'api/v1/auth/login', { email, password });

  if (!loginResData.success) {
    const errorsString = getErrorReason(loginResData);
    throw new Error(`Login failed: ${errorsString}`);
  }
  //Unpack required items
  const returnObj = {
    userId: loginResData.userId,
    userType: loginResData.userType,
    token: loginResData.token,
  };

  return returnObj;
};

export const signupRequest = async ({ email, password }) => {
  const signupResData = await getApiResponse('POST', 'api/v1/auth/signup', { email, password });

  if (!signupResData.success) {
    const errorsString = getErrorReason(signupResData);
    throw new Error(`Signup failed: ${errorsString}`);
  }

  // Don't need to return anything, if success then return true
  return true;
};
