import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button.jsx';
import Logo from '../components/ui/Logo.jsx';
import { RouteIcon, BookIcon, SparkIcon, ChartIcon, ArrowRightIcon } from '../components/ui/icons.jsx';
import { uz } from '../locales/uz.js';

const FEATURES = [
  { Icon: RouteIcon, title: uz.tour.f1Title, text: uz.tour.f1Text },
  { Icon: BookIcon, title: uz.tour.f2Title, text: uz.tour.f2Text },
  { Icon: SparkIcon, title: uz.tour.f3Title, text: uz.tour.f3Text },
  { Icon: ChartIcon, title: uz.tour.f4Title, text: uz.tour.f4Text },
];

const WelcomePage = () => (
  <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-8">
    <header className="flex items-center justify-between">
      <Logo size={30} />
      <Link
        to="/login"
        className="text-sm font-semibold text-content-muted hover:text-content-strong"
      >
        {uz.auth.login}
      </Link>
    </header>

    <div className="flex flex-1 flex-col justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="mx-auto max-w-xl text-3xl font-extrabold leading-tight md:text-4xl">
          {uz.tour.heroTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-content-muted">
          {uz.tour.heroSubtitle}
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full px-8">
              {uz.tour.getStarted}
              <ArrowRightIcon width={18} height={18} />
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full px-8">
              {uz.tour.haveAccount}
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FEATURES.map(({ Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            className="surface flex items-start gap-3.5 p-4"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Icon width={20} height={20} />
            </span>
            <div>
              <p className="font-bold text-content-strong">{title}</p>
              <p className="mt-0.5 text-[13px] text-content-muted">{text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default WelcomePage;
