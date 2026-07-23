import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Logo from '../components/ui/Logo.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { uz } from '../locales/uz.js';

const AdminShell = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const NAV = [
    { to: '/admin', label: uz.admin.overview, end: true, show: true },
    { to: '/admin/courses', label: uz.admin.courses, show: isAdmin },
    { to: '/admin/students', label: uz.admin.students, show: true },
    { to: '/admin/users', label: uz.admin.users, show: isAdmin },
  ].filter((n) => n.show);

  return (
    <div className="min-h-screen">
      <header className="glass safe-top sticky top-0 z-20 border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Logo size={28} showWord={false} />
            <span className="font-display text-lg font-extrabold">{uz.admin.title}</span>
            {user?.role === 'teacher' && (
              <span className="rounded-full border border-ink-700 bg-ink-850 px-2 py-0.5 text-[11px] font-semibold text-content-muted">
                {uz.admin.roleTeacher}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="rounded-xl px-3 py-1.5 text-[13px] font-semibold text-content-muted hover:text-content-strong"
            >
              {uz.admin.backToApp}
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl px-3 py-1.5 text-[13px] font-semibold text-content-muted hover:text-red-600"
            >
              {uz.auth.logout}
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-3 pb-2 no-scrollbar">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `shrink-0 rounded-xl px-3 py-1.5 text-[14px] font-semibold transition-colors ${
                  isActive ? 'bg-accent-soft text-accent' : 'text-content-muted hover:text-content-strong'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminShell;
