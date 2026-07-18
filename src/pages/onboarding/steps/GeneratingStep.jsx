import { motion } from 'framer-motion';
import { LogoMark } from '../../../components/ui/Logo.jsx';
import { uz } from '../../../locales/uz.js';

const GeneratingStep = () => (
  <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
    <div className="relative flex h-28 w-28 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent/40"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
      />
      <motion.span
        className="absolute inset-3 rounded-full border-2 border-transparent border-b-teal/70"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
      >
        <LogoMark size={44} />
      </motion.div>
    </div>
    <div>
      <h2 className="text-xl font-extrabold">{uz.onboarding.generatingTitle}</h2>
      <p className="mt-2 text-sm text-content-muted">{uz.onboarding.generatingSubtitle}</p>
    </div>
  </div>
);

export default GeneratingStep;
