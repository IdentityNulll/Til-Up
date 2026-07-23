import axiosClient from './axiosClient.js';

export const listCourses = async () => {
  const { data } = await axiosClient.get('/courses');
  return data.courses;
};

export const getCourseRoadmap = async (courseId) => {
  const { data } = await axiosClient.get(`/courses/${courseId}/roadmap`);
  return data;
};

export const completeNode = async (courseId, nodeId) => {
  const { data } = await axiosClient.post(`/courses/${courseId}/nodes/${nodeId}/complete`);
  return data.enrollment;
};

export const myEnrollments = async () => {
  const { data } = await axiosClient.get('/courses/me/enrollments');
  return data.enrollments;
};
