import { getApiResponse, getErrorReason } from './apiUtils';

export const populateUsersRequest = async () => {
  const profilesResData = await getApiResponse('GET', 'api/v1/staff/users', null, true);

  if (!profilesResData.success) {
    const errorsString = getErrorReason(profilesResData);
    throw new Error(`Get users failed: ${errorsString}`);
  }

  const returnObj = {
    users: profilesResData.data,
  };
  
  return returnObj;
};
