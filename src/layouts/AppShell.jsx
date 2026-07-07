import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from '../components/ui/BottomNav.jsx';
import TopBar from '../components/ui/TopBar.jsx';

const AppShell = () => {
  const location = useLocation();

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-obsidian-950">
      <TopBar title="TilUp" />
      <main className="flex-1 px-5 py-6 pb-24">
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
      </main>
      <BottomNav />
    </div>
  );
};

export default AppShell;
