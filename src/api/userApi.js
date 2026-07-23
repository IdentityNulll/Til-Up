import axiosClient from './axiosClient.js';

export const getCurrentUser = async () => {
  const { data } = await axiosClient.get('/users/me');
  return data.user;
};

export const updateProfile = async ({ name, avatarUrl }) => {
  const { data } = await axiosClient.patch('/users/me', { name, avatarUrl });
  return data.user;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const { data } = await axiosClient.post('/users/me/password', { currentPassword, newPassword });
  return data;
};
