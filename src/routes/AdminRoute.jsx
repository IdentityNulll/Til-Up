import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/ui/Spinner.jsx';
import { useAuth } from '../hooks/useAuth.js';

// Admin + teacher only. Others are bounced to the app.
const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin' && user.role !== 'teacher') {
    return <Navigate to="/courses" replace />;
  }
  return <Outlet />;
};

export default AdminRoute;
