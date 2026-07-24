import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button.jsx';
import OptionCard from '../../components/ui/OptionCard.jsx';
import Logo from '../../components/ui/Logo.jsx';
import { TargetIcon } from '../../components/ui/icons.jsx';
import { LEVELS, LEVEL_META } from '../../constants/levels.js';
import { completeOnboarding } from '../../api/onboardingApi.js';
import { useAuth } from '../../hooks/useAuth.js';
import { uz } from '../../locales/uz.js';

const TargetLevelPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [level, setLevel] = useState(null);
  const [busy, setBusy] = useState(false);

  const finish = async (targetLevel) => {
    setBusy(true);
    try {
      const { user } = await completeOnboarding({ targetLevel: targetLevel || null });
      if (user) setUser(user);
      navigate('/courses', { replace: true });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-8 pt-8">
      <div className="mb-6 flex items-center justify-between">
        <Logo size={28} />
        <button
          type="button"
          onClick={() => finish(null)}
          disabled={busy}
          className="text-sm font-semibold text-content-muted hover:text-content-strong"
        >
          {uz.onboarding.skip}
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-1 flex-col">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <TargetIcon width={20} height={20} />
        </span>
        <h1 className="mt-3 text-xl font-extrabold">{uz.onboarding.levelTitle}</h1>
        <p className="mt-1 text-sm text-content-muted">{uz.onboarding.levelSubtitle}</p>

        <div className="mt-6 flex flex-col gap-2.5">
          {LEVELS.map((code) => (
            <OptionCard
              key={code}
              selected={level === code}
              onClick={() => setLevel(code)}
              emblem={code}
              title={LEVEL_META[code].title}
              hint={LEVEL_META[code].hint}
            />
          ))}
        </div>

        <Button size="lg" disabled={!level || busy} onClick={() => finish(level)} className="mt-auto w-full">
          {uz.onboarding.continue}
        </Button>
      </motion.div>
    </div>
  );
};

export default TargetLevelPage;
