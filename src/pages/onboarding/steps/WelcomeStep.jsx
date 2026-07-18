import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button.jsx';
import { LogoMark } from '../../../components/ui/Logo.jsx';
import { RouteIcon, BookIcon, TrophyIcon, ArrowRightIcon } from '../../../components/ui/icons.jsx';
import { uz } from '../../../locales/uz.js';

const FEATURES = [
  { Icon: RouteIcon, title: 'Shaxsiy yoʻnalish', hint: 'Darajangizga moslashgan reja' },
  { Icon: BookIcon, title: 'Interaktiv darslar', hint: 'Grammatika, mashqlar va testlar' },
  { Icon: TrophyIcon, title: 'Motivatsiya', hint: 'XP, streak va yutuqlar' },
];

const WelcomeStep = ({ onNext }) => (
  <div className="flex flex-1 flex-col">
    <div className="flex flex-1 flex-col justify-center gap-8">
      <div className="flex flex-col items-center gap-5 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        >
          <div className="rounded-3xl bg-accent-soft p-3 shadow-glow">
            <LogoMark size={64} />
          </div>
        </motion.div>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[26px] font-extrabold leading-tight"
          >
            {uz.onboarding.welcomeTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-content-muted"
          >
            {uz.onboarding.welcomeSubtitle}
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {FEATURES.map(({ Icon, title, hint }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.08 }}
            className="surface flex items-center gap-3.5 p-3.5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-bright">
              <Icon width={20} height={20} />
            </span>
            <div>
              <p className="text-sm font-bold text-content-strong">{title}</p>
              <p className="text-[13px] text-content-faint">{hint}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <Button size="lg" onClick={onNext} className="mt-8 w-full">
      {uz.onboarding.welcomeCta}
      <ArrowRightIcon width={18} height={18} />
    </Button>
  </div>
);

export default WelcomeStep;
