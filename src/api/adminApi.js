import axiosClient from './axiosClient.js';

// Insight (admin + teacher)
export const getOverview = async () => (await axiosClient.get('/admin/overview')).data;
export const getEnrollments = async () =>
  (await axiosClient.get('/admin/enrollments')).data.enrollments;

// Users / roles (admin)
export const getUsers = async () => (await axiosClient.get('/admin/users')).data.users;
export const setUserRole = async (id, role) =>
  (await axiosClient.patch(`/admin/users/${id}/role`, { role })).data.user;

// Courses (admin)
export const getAdminCourses = async () => (await axiosClient.get('/admin/courses')).data.courses;
export const createCourse = async (payload) =>
  (await axiosClient.post('/admin/courses', payload)).data.course;
export const updateCourse = async (id, payload) =>
  (await axiosClient.patch(`/admin/courses/${id}`, payload)).data.course;
export const deleteCourse = async (id) => (await axiosClient.delete(`/admin/courses/${id}`)).data;

// Course detail (reuse student endpoint for modules+lessons)
export const getCourseDetail = async (id) => (await axiosClient.get(`/courses/${id}`)).data;

// Modules / lessons (admin)
export const createModule = async (payload) =>
  (await axiosClient.post('/admin/modules', payload)).data.module;
export const deleteModule = async (id) => (await axiosClient.delete(`/admin/modules/${id}`)).data;
export const createLesson = async (payload) =>
  (await axiosClient.post('/admin/lessons', payload)).data.lesson;
export const updateLesson = async (id, payload) =>
  (await axiosClient.patch(`/admin/lessons/${id}`, payload)).data.lesson;
export const deleteLesson = async (id) => (await axiosClient.delete(`/admin/lessons/${id}`)).data;

// Lesson PDF (admin)
export const uploadLessonPdf = async (lessonId, file) => {
  const fd = new FormData();
  fd.append('pdf', file);
  const { data } = await axiosClient.post(`/admin/lessons/${lessonId}/pdf`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.lesson;
};
export const deleteLessonPdf = async (lessonId) =>
  (await axiosClient.delete(`/admin/lessons/${lessonId}/pdf`)).data.lesson;

// Lesson questions (admin — includes answers)
export const getLessonQuestions = async (lessonId) =>
  (await axiosClient.get(`/admin/lessons/${lessonId}/questions`)).data.questions;
export const createQuestion = async (lessonId, payload) =>
  (await axiosClient.post(`/admin/lessons/${lessonId}/questions`, payload)).data.question;
export const deleteQuestion = async (id) => (await axiosClient.delete(`/admin/questions/${id}`)).data;

// Fetch a course's modules+lessons (reuse student detail endpoint)
export const getLessonMeta = async (courseId, lessonId) => {
  const { data } = await axiosClient.get(`/courses/${courseId}`);
  return data.lessons.find((l) => String(l._id) === String(lessonId));
};
