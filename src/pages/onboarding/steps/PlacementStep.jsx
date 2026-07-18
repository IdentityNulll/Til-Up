import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../../../components/ui/Button.jsx';
import OptionCard from '../../../components/ui/OptionCard.jsx';
import Stepper from '../../../components/ui/Stepper.jsx';
import Spinner from '../../../components/ui/Spinner.jsx';
import StepHeader from './StepHeader.jsx';
import { BookIcon, ArrowLeftIcon, ArrowRightIcon } from '../../../components/ui/icons.jsx';
import { uz } from '../../../locales/uz.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const PlacementStep = ({ questions, answers, onAnswer, onSubmit, onBack, submitting }) => {
  const [index, setIndex] = useState(0);

  if (!questions.length) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const question = questions[index];
  const selected = answers[question.id];
  const isLast = index === questions.length - 1;
  const canProceed = selected !== undefined;

  const handleNext = () => {
    if (isLast) onSubmit();
    else setIndex((i) => i + 1);
  };

  const handleBack = () => {
    if (index === 0) onBack();
    else setIndex((i) => i - 1);
  };

  return (
    <div className="flex flex-1 flex-col gap-5">
      <StepHeader
        icon={<BookIcon width={20} height={20} />}
        title={uz.onboarding.placementTitle}
        subtitle={uz.onboarding.placementSubtitle}
      />

      <div className="flex items-center gap-3">
        <Stepper current={index} total={questions.length} />
        <span className="shrink-0 text-xs font-bold text-content-faint">
          {index + 1}/{questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4"
        >
          <div className="surface p-4">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-accent">
              {uz.onboarding.placementQuestion} {index + 1}
            </p>
            <p className="text-lg font-semibold leading-snug text-content-strong">
              {question.prompt}
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {question.options.map((option, optionIndex) => (
              <OptionCard
                key={optionIndex}
                selected={selected === optionIndex}
                onClick={() => onAnswer(question.id, optionIndex)}
                emblem={LETTERS[optionIndex]}
                title={option}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto flex gap-3 pt-2">
        <Button variant="secondary" onClick={handleBack} className="flex-1" disabled={submitting}>
          <ArrowLeftIcon width={18} height={18} />
          {uz.common.back}
        </Button>
        <Button onClick={handleNext} disabled={!canProceed || submitting} className="flex-[1.6]">
          {isLast ? uz.common.continue : uz.common.next}
          <ArrowRightIcon width={18} height={18} />
        </Button>
      </div>
    </div>
  );
};

export default PlacementStep;
