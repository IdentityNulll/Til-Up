import { motion } from 'framer-motion';
import { SparkIcon } from '../components/ui/icons.jsx';
import { uz } from '../locales/uz.js';

const ComingSoon = ({ title, description }) => (
  <div className="flex flex-col gap-5">
    <h1 className="px-1 text-2xl font-extrabold">{title}</h1>

    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface relative flex flex-col items-center gap-4 overflow-hidden px-6 py-14 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent-bright shadow-glow-sm">
        <SparkIcon width={28} height={28} />
      </span>
      <div className="relative">
        <p className="text-lg font-bold text-content-strong">{uz.common.comingSoon}</p>
        <p className="mx-auto mt-1.5 max-w-[15rem] text-sm text-content-muted">
          {description || 'Bu boʻlim ustida ishlayapmiz. Tez orada shu yerda paydo boʻladi.'}
        </p>
      </div>
      <span className="rounded-full border border-ink-700 bg-ink-850 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-content-faint">
        Ishlab chiqilmoqda
      </span>
    </motion.div>
  </div>
);

export default ComingSoon;
