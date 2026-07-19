import { motion } from 'framer-motion';
import { CheckIcon, BookIcon, TrophyIcon } from './icons.jsx';

// Small lock glyph for locked nodes.
const LockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...props}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
  </svg>
);

const RoadmapNode = ({ node, onClick }) => {
  const { type, status, title } = node;
  const isCheckpoint = type === 'checkpoint';
  const clickable = status !== 'locked';

  const shape = isCheckpoint ? 'rounded-2xl h-16 w-16' : 'rounded-full h-16 w-16';

  const styles = {
    completed: 'bg-accent-grad text-ink-base shadow-glow-sm',
    current: 'bg-accent-grad text-ink-base shadow-glow',
    locked: 'border-2 border-ink-700 bg-ink-850 text-content-faint',
  }[status];

  const Icon = isCheckpoint ? TrophyIcon : status === 'completed' ? CheckIcon : status === 'locked' ? LockIcon : BookIcon;

  return (
    <div className="relative flex flex-col items-center gap-1.5">
      {status === 'current' && (
        <motion.span
          className="absolute top-0 h-16 w-16 rounded-full bg-accent/30"
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      )}
      <motion.button
        type="button"
        disabled={!clickable}
        onClick={onClick}
        whileTap={clickable ? { scale: 0.94 } : undefined}
        className={`relative flex items-center justify-center ${shape} ${styles} ${
          clickable ? '' : 'cursor-not-allowed'
        }`}
      >
        <Icon width={26} height={26} strokeWidth={status === 'completed' ? 2.6 : 1.9} />
      </motion.button>
      <span
        className={`max-w-[7rem] text-center text-[11px] font-semibold leading-tight ${
          status === 'locked' ? 'text-content-faint' : 'text-content'
        }`}
      >
        {title}
      </span>
    </div>
  );
};

export default RoadmapNode;
