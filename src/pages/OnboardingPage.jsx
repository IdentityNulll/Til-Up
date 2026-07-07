import { motion } from 'framer-motion';
import Card from '../components/ui/Card.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { uz } from '../locales/uz.js';

const OnboardingPage = () => {
  const { loading, error } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-obsidian-950">
        <Spinner />
        <p className="text-sm text-gray-500">{uz.auth.connecting}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian-950 px-6 text-center">
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-obsidian-950 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span className="text-5xl">🚀</span>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-100">{uz.onboarding.title}</h1>
        <p className="mt-2 text-sm text-gray-400">{uz.onboarding.subtitle}</p>
      </div>
      <Card className="w-full max-w-sm text-sm text-gray-500">{uz.common.comingSoon}</Card>
    </motion.div>
  );
};

export default OnboardingPage;
