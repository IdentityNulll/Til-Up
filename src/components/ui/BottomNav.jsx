import { NavLink } from 'react-router-dom';
import { uz } from '../../locales/uz.js';

const NAV_ITEMS = [
  { to: '/', label: uz.nav.roadmap, icon: '🗺️' },
  { to: '/statistics', label: uz.nav.statistics, icon: '📊' },
  { to: '/profile', label: uz.nav.profile, icon: '👤' },
];

const BottomNav = () => {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-10 border-t border-obsidian-700 bg-obsidian-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-xl2 px-4 py-2 text-xs font-medium transition-colors ${
                isActive ? 'text-accent' : 'text-gray-500'
              }`
            }
          >
            <span className="text-xl leading-none">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
