import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import GuestRoute from './GuestRoute.jsx';
import OnboardingRoute from './OnboardingRoute.jsx';
import AppShell from '../layouts/AppShell.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import RoadmapPage from '../pages/RoadmapPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import StatisticsPage from '../pages/StatisticsPage.jsx';
import LessonPage from '../pages/LessonPage.jsx';
import EssayPage from '../pages/EssayPage.jsx';
import MockExamPage from '../pages/MockExamPage.jsx';

const AppRoutes = () => (
  <Routes>
    <Route element={<GuestRoute />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    <Route path="/onboarding" element={<OnboardingRoute />} />

    <Route element={<ProtectedRoute />}>
      <Route element={<AppShell />}>
        <Route path="/" element={<RoadmapPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/essay" element={<EssayPage />} />
        <Route path="/mock-exam" element={<MockExamPage />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
