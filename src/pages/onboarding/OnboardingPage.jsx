import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '../../components/ui/Spinner.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { getPlacementTest, completeOnboarding } from '../../api/onboardingApi.js';
import { uz } from '../../locales/uz.js';
import WelcomeStep from './steps/WelcomeStep.jsx';
import LevelStep from './steps/LevelStep.jsx';
import TimeframeStep from './steps/TimeframeStep.jsx';
import PlacementStep from './steps/PlacementStep.jsx';
import GeneratingStep from './steps/GeneratingStep.jsx';
import ResultStep from './steps/ResultStep.jsx';

const STEPS = ['welcome', 'level', 'timeframe', 'placement', 'generating', 'result'];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, setUser, loading: authLoading, error: authError } = useAuth();

  const [step, setStep] = useState('welcome');
  const [targetLevel, setTargetLevel] = useState(null);
  const [timeframe, setTimeframe] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the placement questions the first time we reach that step.
  useEffect(() => {
    if (step === 'placement' && questions.length === 0) {
      getPlacementTest()
        .then(setQuestions)
        .catch((err) => setError(err.response?.data?.message || err.message));
    }
  }, [step, questions.length]);

  const goTo = (next) => {
    setError(null);
    setStep(next);
  };

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    setStep('generating');
    try {
      const data = await completeOnboarding({ targetLevel, timeframe, placementAnswers: answers });
      setResult(data);
      setStep('result');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setStep('placement');
    } finally {
      setSubmitting(false);
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

  const stepIndex = STEPS.indexOf(step);

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-8 pt-8">
      {stepIndex > 0 && step !== 'generating' && step !== 'result' && (
        <div className="mb-6 flex gap-1.5">
          {STEPS.slice(1, 4).map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= stepIndex - 1 ? 'bg-accent-grad' : 'bg-ink-750'
              }`}
            />
          ))}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl2 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
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
              onNext={() => goTo('placement')}
              onBack={() => goTo('level')}
            />
          )}

          {step === 'placement' && (
            <PlacementStep
              questions={questions}
              answers={answers}
              onAnswer={handleAnswer}
              onSubmit={handleSubmit}
              onBack={() => goTo('timeframe')}
              submitting={submitting}
            />
          )}

          {step === 'generating' && <GeneratingStep />}

          {step === 'result' && result && (
            <ResultStep result={result} onFinish={handleFinish} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingPage;
