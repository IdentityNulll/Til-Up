import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import RoadmapNode from '../components/ui/RoadmapNode.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { FlameIcon, SparkIcon, ArrowLeftIcon } from '../components/ui/icons.jsx';
import { getCourseRoadmap, completeNode } from '../api/coursesApi.js';
import { uz } from '../locales/uz.js';

const STATUS_PILL = {
  completed: { label: uz.roadmap.completed, cls: 'text-accent border-accent/30 bg-accent-soft' },
  current: { label: uz.roadmap.inProgress, cls: 'text-accent border-accent/30 bg-accent-soft' },
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

const CourseRoadmapPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    getCourseRoadmap(courseId)
      .then(setData)
      .catch((err) => setError(err.response?.data?.message || uz.common.error));
  }, [courseId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleNodeClick = async (node) => {
    if (node.status === 'locked') return;
    // Mark the node complete and refresh the roadmap (lesson content viewer TBD).
    await completeNode(courseId, node.id);
    load();
  };

  if (error) return <Card className="text-center text-sm text-content-muted">{error}</Card>;
  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { course, modules, totals, stats } = data;

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => navigate('/courses')}
        className="flex items-center gap-1.5 self-start text-sm font-semibold text-content-muted hover:text-content-strong"
      >
        <ArrowLeftIcon width={16} height={16} />
        {uz.courses.title}
      </button>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card raised>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-3xl">
              {course.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-extrabold text-content-strong">{course.title}</p>
              <div className="mt-1 flex items-center gap-3 text-[13px] text-content-muted">
                <span className="flex items-center gap-1">
                  <SparkIcon width={14} height={14} className="text-accent" /> {stats.xp}
                </span>
                <span className="flex items-center gap-1">
                  <FlameIcon width={14} height={14} className="text-orange-400" /> {stats.streak}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[12px] text-content-muted">
              <span>{uz.roadmap.yourJourney}</span>
              <span className="font-semibold text-content">
                {totals.completed}/{totals.nodes}
              </span>
            </div>
            <ProgressBar value={totals.completed} max={totals.nodes || 1} />
          </div>
        </Card>
      </motion.div>

      {modules.map((mod, i) => (
        <ModuleSection key={mod.code} mod={mod} index={i} onNodeClick={handleNodeClick} />
      ))}
    </div>
  );
};

export default CourseRoadmapPage;
