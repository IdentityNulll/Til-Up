// Signature level badge for the C → A+ tier system.
// status: 'completed' | 'current' | 'locked'
const SIZES = {
  sm: 'h-9 w-9 text-xs rounded-xl',
  md: 'h-12 w-12 text-sm rounded-2xl',
  lg: 'h-16 w-16 text-lg rounded-2xl',
};

const LevelBadge = ({ code, status = 'locked', size = 'md', className = '' }) => {
  const styles = {
    completed: 'bg-accent-grad text-ink-base shadow-glow-sm',
    current: 'border-2 border-accent bg-accent-soft text-accent-bright shadow-glow',
    locked: 'border border-ink-700 bg-ink-850 text-content-faint',
  }[status];

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center font-extrabold tracking-tight ${SIZES[size]} ${styles} ${className}`}
    >
      {code}
    </span>
  );
};

export default LevelBadge;
