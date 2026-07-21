import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button.jsx';
import { CheckIcon, ArrowRightIcon } from '../../../components/ui/icons.jsx';
import { TIMEFRAMES } from '../../../constants/levels.js';
import { uz } from '../../../locales/uz.js';

const Metric = ({ label, value, accent }) => (
  <div className="surface flex-1 p-4 text-center">
    <p className="text-[11px] font-semibold uppercase tracking-wide text-content-faint">{label}</p>
    <p className={`mt-1 text-2xl font-extrabold ${accent ? 'text-gradient' : 'text-content-strong'}`}>
      {value}
    </p>
  </div>
);

const ResultStep = ({ result, onFinish }) => {
  const { user, roadmap } = result;
  const levelPath = roadmap?.levelPath || [];
  const timeframeLabel =
    TIMEFRAMES.find((t) => t.value === user?.timeframe)?.label || user?.timeframe;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 13 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-grad text-ink-base shadow-glow"
        >
          <CheckIcon width={38} height={38} strokeWidth={2.6} />
        </motion.div>
        <h2 className="text-2xl font-extrabold">{uz.onboarding.resultTitle}</h2>
      </div>

      <div className="flex gap-3">
        <Metric label={uz.onboarding.resultTarget} value={user?.targetLevel} accent />
        <Metric label={uz.onboarding.resultTimeframe} value={timeframeLabel} />
      </div>

      <div className="surface p-5">
        <p className="mb-4 text-sm font-bold text-content-strong">{uz.onboarding.resultPath}</p>
        <div className="flex flex-wrap items-center gap-y-3">
          {levelPath.map((code, i) => {
            const isTarget = i === levelPath.length - 1;
            return (
              <motion.div
                key={code}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i, type: 'spring', stiffness: 260, damping: 18 }}
                className="flex items-center"
              >
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-extrabold ${
                      isTarget
                        ? 'bg-accent-grad text-ink-base shadow-glow-sm'
                        : 'border border-ink-700 bg-ink-850 text-content'
                    }`}
                  >
                    {code}
                  </span>
                  {isTarget && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-content-faint">
                      {uz.onboarding.resultTarget}
                    </span>
                  )}
                </div>
                {i < levelPath.length - 1 && (
                  <span className="mx-1 mb-4 h-px w-4 bg-gradient-to-r from-ink-600 to-ink-700" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <Button size="lg" onClick={onFinish} className="mt-auto w-full">
        {uz.onboarding.resultCta}
        <ArrowRightIcon width={18} height={18} />
      </Button>
    </div>
  );
};

export default ResultStep;
