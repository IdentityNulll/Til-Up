import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../../components/ui/Button.jsx';
import OptionCard from '../../components/ui/OptionCard.jsx';
import Stepper from '../../components/ui/Stepper.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import Logo from '../../components/ui/Logo.jsx';
import { CheckIcon } from '../../components/ui/icons.jsx';
import { getOnboardingTest, completeOnboarding } from '../../api/onboardingApi.js';
import { useAuth } from '../../hooks/useAuth.js';
import { uz } from '../../locales/uz.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const OnboardingTest = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [questions, setQuestions] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    getOnboardingTest()
      .then(setQuestions)
      .catch(() => setQuestions([]));
  }, []);

  const finish = async ({ skipped }) => {
    setBusy(true);
    try {
      const data = await completeOnboarding(skipped ? { skipped: true } : { answers });
      if (data.user) setUser(data.user);
      if (skipped) navigate('/courses', { replace: true });
      else setResult(data.score ?? 0);
    } finally {
      setBusy(false);
    }
  };

  if (questions === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // No questions configured → skip straight through.
  if (questions.length === 0 && !result) {
    finish({ skipped: true });
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (result !== null) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 px-5 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-grad text-ink-base shadow-glow">
          <CheckIcon width={38} height={38} strokeWidth={2.6} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold">{uz.onboarding.resultTitle}</h1>
          <p className="mt-2 text-content-muted">
            {uz.onboarding.yourScore}: <span className="font-bold text-accent">{result}%</span>
          </p>
        </div>
        <Button size="lg" onClick={() => navigate('/courses', { replace: true })} className="w-full max-w-xs">
          {uz.onboarding.toCourses}
        </Button>
      </div>
    );
  }

  const q = questions[index];
  const selected = answers[q.id];
  const isLast = index === questions.length - 1;

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-8 pt-8">
      <div className="mb-6 flex items-center justify-between">
        <Logo size={28} />
        <button
          type="button"
          onClick={() => finish({ skipped: true })}
          disabled={busy}
          className="text-sm font-semibold text-content-muted hover:text-content-strong"
        >
          {uz.onboarding.skip}
        </button>
      </div>

      <div className="mb-2">
        <h1 className="text-xl font-extrabold">{uz.onboarding.testTitle}</h1>
        <p className="mt-1 text-sm text-content-muted">{uz.onboarding.testSubtitle}</p>
      </div>

      <div className="my-4 flex items-center gap-3">
        <Stepper current={index} total={questions.length} />
        <span className="shrink-0 text-xs font-bold text-content-faint">
          {index + 1}/{questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4"
        >
          <div className="surface p-4">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-accent">
              {uz.onboarding.question} {index + 1}
            </p>
            <p className="text-lg font-semibold text-content-strong">{q.prompt}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            {q.options.map((opt, oi) => (
              <OptionCard
                key={oi}
                selected={selected === oi}
                onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                emblem={LETTERS[oi]}
                title={opt}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto pt-4">
        <Button
          size="lg"
          disabled={selected === undefined || busy}
          onClick={() => (isLast ? finish({ skipped: false }) : setIndex((i) => i + 1))}
          className="w-full"
        >
          {isLast ? uz.onboarding.submit : uz.common.next}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingTest;
