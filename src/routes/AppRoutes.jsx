import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import AppShell from '../layouts/AppShell.jsx';
import OnboardingPage from '../pages/onboarding/OnboardingPage.jsx';
import RoadmapPage from '../pages/RoadmapPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import StatisticsPage from '../pages/StatisticsPage.jsx';
import LessonPage from '../pages/LessonPage.jsx';
import EssayPage from '../pages/EssayPage.jsx';
import MockExamPage from '../pages/MockExamPage.jsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/onboarding" element={<OnboardingPage />} />

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
