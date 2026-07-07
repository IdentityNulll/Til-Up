import axiosClient from './axiosClient.js';

export const getCurrentUser = async () => {
  const { data } = await axiosClient.get('/users/me');
  return data.user;
};
