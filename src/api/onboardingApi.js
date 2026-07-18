import axiosClient from './axiosClient.js';

export const getPlacementTest = async () => {
  const { data } = await axiosClient.get('/onboarding/placement-test');
  return data.questions;
};

export const completeOnboarding = async ({ targetLevel, timeframe, placementAnswers }) => {
  const { data } = await axiosClient.post('/onboarding/complete', {
    targetLevel,
    timeframe,
    placementAnswers,
  });
  return data;
};
