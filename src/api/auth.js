import { post } from './common';

export const loginRequest = async ({ email, password }) => {
  const loginResData = await post('api/v1/auth/login', { email, password });

  if (!loginResData.success) {
    const errorsString = Array.isArray(loginResData.errors)
      ? loginResData.errors
          .map(e => e?.msg)
          .filter(Boolean)
          .join(', ')
      : undefined;
    throw new Error(
      `Login failed: ${errorsString || loginResData.error || loginResData.name || loginResData.message || 'Unknown error'}`,
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
