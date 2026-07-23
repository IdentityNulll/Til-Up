import { Navigate } from 'react-router-dom';
import Spinner from '../components/ui/Spinner.jsx';
import { useAuth } from '../hooks/useAuth.js';
import OnboardingPage from '../pages/onboarding/OnboardingPage.jsx';

// Onboarding requires a logged-in user but only for those not yet onboarded.
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
  if (user.onboardingCompleted) return <Navigate to="/" replace />;
  return <OnboardingPage />;
};

export default OnboardingRoute;
