import { motion } from 'framer-motion';
import { LogoMark } from '../../../components/ui/Logo.jsx';
import { uz } from '../../../locales/uz.js';

const GeneratingStep = () => (
  <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
    <div className="relative flex h-24 w-24 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-ink-750 border-t-accent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
      <LogoMark size={44} />
    </div>
    <div>
      <h2 className="text-xl font-extrabold">{uz.onboarding.generatingTitle}</h2>
      <p className="mt-2 text-sm text-content-muted">{uz.onboarding.generatingSubtitle}</p>
    </div>
  </div>
);

export default GeneratingStep;
