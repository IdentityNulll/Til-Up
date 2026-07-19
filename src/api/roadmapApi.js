import axiosClient from './axiosClient.js';

export const getRoadmap = async () => {
  const { data } = await axiosClient.get('/roadmap');
  return data;
};
