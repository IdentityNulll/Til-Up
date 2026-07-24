import axiosClient from './axiosClient.js';

export const completeOnboarding = async ({ targetLevel } = {}) => {
  const { data } = await axiosClient.post('/onboarding/complete', { targetLevel });
  return data; // { user }
};
