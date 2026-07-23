import axiosClient from './axiosClient.js';

export const getOnboardingTest = async () => {
  const { data } = await axiosClient.get('/onboarding/test');
  return data.questions;
};

export const completeOnboarding = async ({ answers, skipped } = {}) => {
  const { data } = await axiosClient.post('/onboarding/complete', { answers, skipped });
  return data; // { user, score, skipped }
};
