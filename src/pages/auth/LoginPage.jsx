import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import GoogleButton from '../../components/ui/GoogleButton.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { uz } from '../../locales/uz.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || uz.auth.genericError);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async (credential) => {
    setError(null);
    try {
      await loginWithGoogle(credential);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || uz.auth.genericError);
    }
  };

  return (
    <AuthLayout title={uz.auth.loginTitle} subtitle={uz.auth.loginSubtitle}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-xl2 border border-red-300 bg-red-50 px-4 py-2.5 text-[13px] text-red-600">
            {error}
          </div>
        )}
        <Input
          label={uz.auth.email}
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={onChange}
          required
          placeholder="siz@example.com"
        />
        <Input
          label={uz.auth.password}
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={onChange}
          required
          placeholder="••••••••"
        />
        <Button type="submit" size="lg" disabled={submitting} className="mt-1 w-full">
          {uz.auth.login}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-[12px] text-content-faint">
        <span className="h-px flex-1 bg-ink-750" />
        {uz.auth.orContinue}
        <span className="h-px flex-1 bg-ink-750" />
      </div>

      <GoogleButton onCredential={handleGoogle} />

      <p className="mt-6 text-center text-[13px] text-content-muted">
        {uz.auth.noAccount}{' '}
        <Link to="/register" className="font-semibold text-accent hover:text-accent-dim">
          {uz.auth.register}
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
