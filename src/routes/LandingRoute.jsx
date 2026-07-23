import { Navigate } from 'react-router-dom';
import Spinner from '../components/ui/Spinner.jsx';
import { useAuth } from '../hooks/useAuth.js';
import WelcomePage from '../pages/WelcomePage.jsx';

// "/" — public feature tour for guests, app home for signed-in users.
const LandingRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return user ? <Navigate to="/courses" replace /> : <WelcomePage />;
};

export default LandingRoute;
