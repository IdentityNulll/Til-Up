import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import LevelBadge from '../components/ui/LevelBadge.jsx';
import RoadmapNode from '../components/ui/RoadmapNode.jsx';
import DailyGoalRing from '../components/ui/DailyGoalRing.jsx';
import { FlameIcon } from '../components/ui/icons.jsx';
import { getRoadmap } from '../api/roadmapApi.js';
import { haptic } from '../lib/telegram.js';
import { uz } from '../locales/uz.js';

const LevelSection = ({ level, onNodeClick }) => {
  const statusPill = {
    completed: { label: 'Tugallandi', cls: 'text-accent-bright border-accent/40 bg-accent-soft' },
    current: { label: 'Davom etyapti', cls: 'text-accent-bright border-accent/40 bg-accent-soft' },
    locked: { label: 'Qulflangan', cls: 'text-content-faint border-ink-700 bg-ink-850' },
  }[level.status];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <LevelBadge code={level.code} status={level.status} size="md" />
        <div className="flex-1">
          <p className="font-bold text-content-strong">{level.title}</p>
          <p className="text-[13px] text-content-faint">{level.hint}</p>
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusPill.cls}`}>
          {statusPill.label}
        </span>
      </div>

      {/* winding node path */}
      <div className="relative py-2">
        <span className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-ink-700/60 via-ink-700 to-ink-700/60" />
        <div className="relative flex flex-col items-center gap-6">
          {level.lessons.map((node, j) => (
            <div
              key={node.id}
              style={{ transform: `translateX(${Math.sin(j * 0.9) * 46}px)` }}
            >
              <RoadmapNode node={node} onClick={() => onNodeClick(node)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RoadmapPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRoadmap()
      .then(setData)
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Spinner />
        <p className="text-sm text-content-muted">{uz.common.loading}</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card className="text-center text-sm text-content-muted">{error || uz.common.error}</Card>
    );
  }

  const { levels, target, stats } = data;

  const handleNodeClick = (node) => {
    if (node.status === 'locked') {
      haptic.notify('warning');
      return;
    }
    haptic.impact('light');
    navigate(`/lesson/${node.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Hero: current → target + daily goal */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card raised>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-content-faint">
                {uz.roadmap.yourJourney}
              </p>
              <div className="flex items-center gap-2">
                <LevelBadge code={stats.currentLevel} status="current" size="sm" />
                <span className="text-content-faint">→</span>
                <LevelBadge code={target} status="locked" size="sm" />
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-content-muted">
                <FlameIcon width={15} height={15} className="text-orange-400" />
                <span className="font-semibold text-content">{stats.streak}</span> kunlik seriya
              </div>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <DailyGoalRing value={stats.dailyXp} goal={stats.dailyGoalXp} size={64} />
              <span className="text-[11px] text-content-faint">
                {stats.dailyXp}/{stats.dailyGoalXp} XP
              </span>
            </div>
          </div>
        </Card>
      </motion.div>

      {levels.map((level) => (
        <LevelSection key={level.code} level={level} onNodeClick={handleNodeClick} />
      ))}
    </div>
  );
};

export default RoadmapPage;
