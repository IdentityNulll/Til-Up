import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import LevelBadge from '../components/ui/LevelBadge.jsx';
import RoadmapNode from '../components/ui/RoadmapNode.jsx';
import DailyGoalRing from '../components/ui/DailyGoalRing.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { FlameIcon } from '../components/ui/icons.jsx';
import { getRoadmap } from '../api/roadmapApi.js';
import { uz } from '../locales/uz.js';

const STATUS_PILL = {
  completed: { label: uz.roadmap.completed, cls: 'text-accent-bright border-accent/30 bg-accent-soft' },
  current: { label: uz.roadmap.inProgress, cls: 'text-accent-bright border-accent/30 bg-accent-soft' },
  locked: { label: uz.roadmap.locked, cls: 'text-content-faint border-ink-700 bg-ink-850' },
};

const ModuleSection = ({ mod, index, onNodeClick }) => {
  const pill = STATUS_PILL[mod.status];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${
            mod.status === 'locked'
              ? 'border border-ink-700 bg-ink-850 text-content-faint'
              : 'bg-accent-grad text-ink-base'
          }`}
        >
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="font-bold text-content-strong">{mod.title}</p>
          <p className="text-[13px] text-content-faint">{mod.nodes.length} bosqich</p>
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${pill.cls}`}>
          {pill.label}
        </span>
      </div>

      {/* winding node path */}
      <div className="relative py-2">
        <span className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink-700" />
        <div className="relative flex flex-col items-center gap-6">
          {mod.nodes.map((node, j) => (
            <div key={node.id} style={{ transform: `translateX(${Math.sin(j * 0.9) * 44}px)` }}>
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
    return <Card className="text-center text-sm text-content-muted">{error || uz.common.error}</Card>;
  }

  const { modules = [], target, stats = {} } = data;

  // Guard against a stale backend returning the old shape (no `modules`).
  if (!Array.isArray(modules) || modules.length === 0) {
    return <Card className="text-center text-sm text-content-muted">{uz.common.error}</Card>;
  }

  const allNodes = modules.flatMap((m) => m.nodes);
  const doneCount = allNodes.filter((n) => n.status === 'completed').length;

  const handleNodeClick = (node) => {
    if (node.status === 'locked') return;
    navigate(`/lesson/${node.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Hero: target grade + timeframe + overall progress + daily goal */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card raised>
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-content-faint">
                {uz.roadmap.yourJourney}
              </p>
              <div className="flex items-center gap-2.5">
                <LevelBadge code={target} status="current" size="md" />
                <div>
                  <p className="text-sm font-bold text-content-strong">Maqsad: {target}</p>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[13px] text-content-muted">
                    <FlameIcon width={14} height={14} className="text-orange-400" />
                    <span className="font-semibold text-content">{stats.streak}</span>{' '}
                    {uz.roadmap.dailyStreak}
                  </div>
                </div>
              </div>
            </div>
            <DailyGoalRing value={stats.dailyXp} goal={stats.dailyGoalXp} size={60} />
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[12px] text-content-muted">
              <span>Umumiy progress</span>
              <span className="font-semibold text-content">
                {doneCount}/{allNodes.length}
              </span>
            </div>
            <ProgressBar value={doneCount} max={allNodes.length} />
          </div>
        </Card>
      </motion.div>

      {modules.map((mod, i) => (
        <ModuleSection key={mod.code} mod={mod} index={i} onNodeClick={handleNodeClick} />
      ))}
    </div>
  );
};

export default RoadmapPage;
