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

export const getLesson = async (courseId, lessonId) => {
  const { data } = await axiosClient.get(`/courses/${courseId}/lessons/${lessonId}`);
  return data; // { lesson, questions, completed }
};

export const submitQuiz = async (courseId, lessonId, answers) => {
  const { data } = await axiosClient.post(`/courses/${courseId}/lessons/${lessonId}/quiz`, { answers });
  return data; // { passed, score, correct, total, threshold }
};

// Fetch a protected PDF as an object URL (keeps auth in the header).
export const getPdfObjectUrl = async (fileId) => {
  const res = await axiosClient.get(`/files/${fileId}`, { responseType: 'blob' });
  return URL.createObjectURL(res.data);
};
