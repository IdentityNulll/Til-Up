import Button from '../../../components/ui/Button.jsx';
import OptionCard from '../../../components/ui/OptionCard.jsx';
import StepHeader from './StepHeader.jsx';
import { TargetIcon, ArrowLeftIcon, ArrowRightIcon } from '../../../components/ui/icons.jsx';
import { LEVELS, LEVEL_META } from '../../../constants/levels.js';
import { uz } from '../../../locales/uz.js';

const LevelStep = ({ value, onChange, onNext, onBack }) => (
  <div className="flex flex-1 flex-col gap-5">
    <StepHeader
      icon={<TargetIcon width={20} height={20} />}
      title={uz.onboarding.levelTitle}
      subtitle={uz.onboarding.levelSubtitle}
    />

    <div className="flex flex-col gap-2.5">
      {LEVELS.map((code) => (
        <OptionCard
          key={code}
          selected={value === code}
          onClick={() => onChange(code)}
          emblem={code}
          title={LEVEL_META[code].title}
          hint={LEVEL_META[code].hint}
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

export default LevelStep;
