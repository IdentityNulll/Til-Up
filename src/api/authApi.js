import axiosClient from './axiosClient.js';

export const registerUser = async ({ name, email, password }) => {
  const { data } = await axiosClient.post('/auth/register', { name, email, password });
  return data; // { token, user }
};

export const loginUser = async ({ email, password }) => {
  const { data } = await axiosClient.post('/auth/login', { email, password });
  return data; // { token, user }
};

export const googleLogin = async (credential) => {
  const { data } = await axiosClient.post('/auth/google', { credential });
  return data; // { token, user }
};
