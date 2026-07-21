import axiosClient from './axiosClient.js';

export const completeOnboarding = async ({ targetLevel, timeframe }) => {
  const { data } = await axiosClient.post('/onboarding/complete', { targetLevel, timeframe });
  return data;
};
