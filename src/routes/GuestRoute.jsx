import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/ui/Spinner.jsx';
import { useAuth } from '../hooks/useAuth.js';

// For /login and /register — send already-authenticated users into the app.
const GuestRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;
