import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '../../components/ui/Spinner.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { completeOnboarding } from '../../api/onboardingApi.js';
import { uz } from '../../locales/uz.js';
import WelcomeStep from './steps/WelcomeStep.jsx';
import LevelStep from './steps/LevelStep.jsx';
import TimeframeStep from './steps/TimeframeStep.jsx';
import GeneratingStep from './steps/GeneratingStep.jsx';
import ResultStep from './steps/ResultStep.jsx';

// Input steps shown in the top progress bar (welcome is the intro, generating/
// result are terminal).
const INPUT_STEPS = ['level', 'timeframe'];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, setUser, loading: authLoading, error: authError } = useAuth();

  const [step, setStep] = useState('welcome');
  const [targetLevel, setTargetLevel] = useState(null);
  const [timeframe, setTimeframe] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const goTo = (next) => {
    setError(null);
    setStep(next);
  };

  const handleSubmit = async () => {
    setError(null);
    setStep('generating');
    try {
      const data = await completeOnboarding({ targetLevel, timeframe });
      setResult(data);
      setStep('result');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setStep('timeframe');
    }
  };

  const handleFinish = () => {
    if (result?.user) setUser(result.user);
    navigate('/', { replace: true });
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <Spinner />
        <p className="text-sm text-content-muted">{uz.auth.connecting}</p>
      </div>
    );
  }

  if (authError || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-sm text-content-muted">{authError || uz.auth.failed}</p>
      </div>
    );
  }

  const inputIndex = INPUT_STEPS.indexOf(step);

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-8 pt-8">
      {inputIndex >= 0 && (
        <div className="mb-6 flex gap-1.5">
          {INPUT_STEPS.map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= inputIndex ? 'bg-accent-grad' : 'bg-ink-750'
              }`}
            />
          ))}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl2 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
          className="flex flex-1 flex-col"
        >
          {step === 'welcome' && <WelcomeStep onNext={() => goTo('level')} />}

          {step === 'level' && (
            <LevelStep
              value={targetLevel}
              onChange={setTargetLevel}
              onNext={() => goTo('timeframe')}
              onBack={() => goTo('welcome')}
            />
          )}

          {step === 'timeframe' && (
            <TimeframeStep
              value={timeframe}
              onChange={setTimeframe}
              onNext={handleSubmit}
              onBack={() => goTo('level')}
            />
          )}

          {step === 'generating' && <GeneratingStep />}

          {step === 'result' && result && <ResultStep result={result} onFinish={handleFinish} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingPage;
