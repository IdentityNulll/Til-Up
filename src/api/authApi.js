import axiosClient from './axiosClient.js';

export const loginWithTelegram = async ({ initData, mockUser }) => {
  const { data } = await axiosClient.post('/auth/telegram', { initData, mockUser });
  return data;
};
