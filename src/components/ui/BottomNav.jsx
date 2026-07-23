import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RouteIcon, ChartIcon, UserIcon } from './icons.jsx';
import { uz } from '../../locales/uz.js';

const NAV_ITEMS = [
  { to: '/courses', label: uz.nav.courses, Icon: RouteIcon },
  { to: '/statistics', label: uz.nav.statistics, Icon: ChartIcon },
  { to: '/profile', label: uz.nav.profile, Icon: UserIcon },
];

const BottomNav = () => {
  return (
    <nav className="safe-bottom glass fixed inset-x-0 bottom-0 z-20 border-t md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pt-1.5">
        {NAV_ITEMS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className="relative flex flex-1 flex-col items-center gap-1 py-1.5"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -top-1.5 h-1 w-8 rounded-full bg-accent-grad shadow-glow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  width={22}
                  height={22}
                  className={`transition-colors ${isActive ? 'text-accent-bright' : 'text-content-faint'}`}
                />
                <span
                  className={`text-[11px] font-semibold transition-colors ${
                    isActive ? 'text-content-strong' : 'text-content-faint'
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
