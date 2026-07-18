import { motion } from 'framer-motion';

const ProgressBar = ({ value = 0, max = 100, className = '' }) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-ink-750 ${className}`}>
      <motion.div
        className="h-full rounded-full bg-accent-grad"
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
};

export default ProgressBar;
