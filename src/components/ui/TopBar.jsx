import { FlameIcon, SparkIcon } from './icons.jsx';
import Logo from './Logo.jsx';
import { useAuth } from '../../hooks/useAuth.js';

const Stat = ({ icon, value, tint }) => (
  <div className="flex items-center gap-1.5 rounded-full border border-ink-750 bg-ink-900/70 px-2.5 py-1">
    <span className={tint}>{icon}</span>
    <span className="text-sm font-bold text-content-strong">{value}</span>
  </div>
);

const TopBar = () => {
  const { user } = useAuth();

  return (
    <header className="safe-top glass sticky top-0 z-20 border-b">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <Logo size={30} />
        <div className="flex items-center gap-2">
          <Stat
            icon={<FlameIcon width={15} height={15} />}
            value={user?.streakCount ?? 0}
            tint="text-orange-400"
          />
          <Stat
            icon={<SparkIcon width={15} height={15} />}
            value={user?.xp ?? 0}
            tint="text-accent-bright"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
