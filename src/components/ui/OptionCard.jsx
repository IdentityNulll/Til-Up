import { motion } from 'framer-motion';
import { CheckIcon } from './icons.jsx';

const OptionCard = ({ selected, onClick, title, hint, emblem, className = '' }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      className={`group relative flex w-full items-center gap-3.5 overflow-hidden rounded-xl2 border px-4 py-3.5 text-left transition-all duration-200 ${
        selected
          ? 'border-accent/70 bg-accent-soft shadow-glow-sm'
          : 'border-ink-750 bg-ink-900/70 hover:border-ink-600 hover:bg-ink-850'
      } ${className}`}
    >
      {emblem !== undefined && (
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
            selected
              ? 'bg-accent-grad text-ink-base'
              : 'bg-ink-800 text-content-muted group-hover:text-content'
          }`}
        >
          {emblem}
        </span>
      )}

      <div className="flex-1">
        <p
          className={`font-semibold transition-colors ${
            selected ? 'text-content-strong' : 'text-content'
          }`}
        >
          {title}
        </p>
        {hint && <p className="mt-0.5 text-[13px] text-content-faint">{hint}</p>}
      </div>

      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          selected ? 'border-accent bg-accent text-ink-base' : 'border-ink-600 text-transparent'
        }`}
      >
        <CheckIcon width={14} height={14} strokeWidth={2.5} />
      </span>
    </motion.button>
  );
};

export default OptionCard;
