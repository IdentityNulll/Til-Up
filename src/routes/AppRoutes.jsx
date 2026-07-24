import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import GuestRoute from './GuestRoute.jsx';
import OnboardingRoute from './OnboardingRoute.jsx';
import LandingRoute from './LandingRoute.jsx';
import AdminRoute from './AdminRoute.jsx';
import AppShell from '../layouts/AppShell.jsx';
import AdminShell from '../layouts/AdminShell.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import CoursesPage from '../pages/CoursesPage.jsx';
import CourseRoadmapPage from '../pages/CourseRoadmapPage.jsx';
import LessonView from '../pages/LessonView.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import StatisticsPage from '../pages/StatisticsPage.jsx';
import AdminOverview from '../pages/admin/AdminOverview.jsx';
import AdminCourses from '../pages/admin/AdminCourses.jsx';
import AdminCourseBuilder from '../pages/admin/AdminCourseBuilder.jsx';
import AdminLessonEditor from '../pages/admin/AdminLessonEditor.jsx';
import AdminStudents from '../pages/admin/AdminStudents.jsx';
import AdminUsers from '../pages/admin/AdminUsers.jsx';

const AppRoutes = () => (
  <Routes>
    {/* Public landing (feature tour) */}
    <Route path="/" element={<LandingRoute />} />

    {/* Guest-only auth pages */}
    <Route element={<GuestRoute />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    {/* First-run onboarding (pick target level) */}
    <Route path="/onboarding" element={<OnboardingRoute />} />

    {/* Signed-in app */}
    <Route element={<ProtectedRoute />}>
      <Route element={<AppShell />}>
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseRoadmapPage />} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonView />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Route>
    </Route>

    {/* Admin / teacher dashboard */}
    <Route element={<AdminRoute />}>
      <Route element={<AdminShell />}>
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/courses/:courseId" element={<AdminCourseBuilder />} />
        <Route path="/admin/courses/:courseId/lessons/:lessonId" element={<AdminLessonEditor />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
