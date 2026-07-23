import { motion } from 'framer-motion';
import Logo from '../../components/ui/Logo.jsx';

const AuthLayout = ({ title, subtitle, children }) => (
  <div className="flex min-h-screen items-center justify-center px-5 py-10">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm"
    >
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <Logo size={40} />
        <div>
          <h1 className="text-2xl font-extrabold">{title}</h1>
          <p className="mt-1.5 text-sm text-content-muted">{subtitle}</p>
        </div>
      </div>
      <div className="surface p-6">{children}</div>
    </motion.div>
  </div>
);

export default AuthLayout;
