import Button from '../../../components/ui/Button.jsx';
import OptionCard from '../../../components/ui/OptionCard.jsx';
import StepHeader from './StepHeader.jsx';
import { ClockIcon, ArrowLeftIcon, ArrowRightIcon } from '../../../components/ui/icons.jsx';
import { TIMEFRAMES } from '../../../constants/levels.js';
import { uz } from '../../../locales/uz.js';

const TimeframeStep = ({ value, onChange, onNext, onBack }) => (
  <div className="flex flex-1 flex-col gap-5">
    <StepHeader
      icon={<ClockIcon width={20} height={20} />}
      title={uz.onboarding.timeframeTitle}
      subtitle={uz.onboarding.timeframeSubtitle}
    />

    <div className="flex flex-col gap-2.5">
      {TIMEFRAMES.map((tf) => (
        <OptionCard
          key={tf.value}
          selected={value === tf.value}
          onClick={() => onChange(tf.value)}
          emblem={<ClockIcon width={18} height={18} />}
          title={tf.label}
          hint={tf.hint}
        />
      ))}
    </div>

    <div className="mt-auto flex gap-3 pt-2">
      <Button variant="secondary" onClick={onBack} className="flex-1">
        <ArrowLeftIcon width={18} height={18} />
        {uz.common.back}
      </Button>
      <Button onClick={onNext} disabled={!value} className="flex-[1.6]">
        {uz.common.next}
        <ArrowRightIcon width={18} height={18} />
      </Button>
    </div>
  </div>
);

export default TimeframeStep;
