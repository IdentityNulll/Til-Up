import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from '../components/ui/BottomNav.jsx';
import TopBar from '../components/ui/TopBar.jsx';
import Sidebar from '../components/ui/Sidebar.jsx';

const AppShell = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      {/* Desktop: fixed left sidebar. Mobile: top bar + bottom nav. */}
      <Sidebar />
      <TopBar />

      <main className="md:pl-64">
        <div className="mx-auto max-w-md px-4 py-5 pb-28 md:max-w-3xl md:px-8 md:py-10 md:pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default AppShell;
