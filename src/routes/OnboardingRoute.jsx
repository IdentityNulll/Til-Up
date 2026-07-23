import { Navigate } from 'react-router-dom';
import Spinner from '../components/ui/Spinner.jsx';
import { useAuth } from '../hooks/useAuth.js';
import OnboardingTest from '../pages/onboarding/OnboardingTest.jsx';

// Onboarding test requires a logged-in user who hasn't finished it yet.
const OnboardingRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (user.onboardingCompleted) return <Navigate to="/courses" replace />;
  return <OnboardingTest />;
};

export default OnboardingRoute;
