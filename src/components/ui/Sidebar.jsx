import { NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';
import Avatar from './Avatar.jsx';
import { RouteIcon, ChartIcon, UserIcon } from './icons.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { uz } from '../../locales/uz.js';

const NAV_ITEMS = [
  { to: '/', label: uz.nav.roadmap, Icon: RouteIcon },
  { to: '/statistics', label: uz.nav.statistics, Icon: ChartIcon },
  { to: '/profile', label: uz.nav.profile, Icon: UserIcon },
];

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-ink-750 bg-ink-900/80 px-4 py-6 backdrop-blur md:flex">
      <div className="px-2">
        <Logo size={30} />
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1.5">
        {NAV_ITEMS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl2 px-3 py-2.5 text-[15px] font-semibold transition-colors ${
                isActive
                  ? 'bg-accent-soft text-accent'
                  : 'text-content-muted hover:bg-ink-850 hover:text-content-strong'
              }`
            }
          >
            <Icon width={20} height={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <NavLink
        to="/profile"
        className="flex items-center gap-3 rounded-xl2 border border-ink-750 bg-ink-850 p-2.5"
      >
        <Avatar user={user} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-content-strong">{user?.name}</p>
          <p className="truncate text-[12px] text-content-faint">{user?.email}</p>
        </div>
      </NavLink>
      <button
        type="button"
        onClick={logout}
        className="mt-2 rounded-xl2 px-3 py-2 text-[13px] font-semibold text-content-muted transition-colors hover:bg-ink-850 hover:text-red-600"
      >
        {uz.auth.logout}
      </button>
    </aside>
  );
};

export default Sidebar;
