import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/ui/Spinner.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { uz } from '../locales/uz.js';

const ProtectedRoute = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-obsidian-950">
        <Spinner />
        <p className="text-sm text-gray-500">{uz.auth.connecting}</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian-950 px-6 text-center">
        <p className="text-sm text-gray-500">{error || uz.auth.failed}</p>
      </div>
    );
  }

  if (!user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
