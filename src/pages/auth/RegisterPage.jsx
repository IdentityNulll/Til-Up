import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import GoogleButton from '../../components/ui/GoogleButton.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { uz } from '../../locales/uz.js';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await register(form);
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
    <AuthLayout title={uz.auth.registerTitle} subtitle={uz.auth.registerSubtitle}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-xl2 border border-red-300 bg-red-50 px-4 py-2.5 text-[13px] text-red-600">
            {error}
          </div>
        )}
        <Input
          label={uz.auth.name}
          name="name"
          value={form.name}
          onChange={onChange}
          required
          placeholder="Ism Familiya"
        />
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
          autoComplete="new-password"
          value={form.password}
          onChange={onChange}
          required
          minLength={6}
          placeholder="Kamida 6 ta belgi"
        />
        <Button type="submit" size="lg" disabled={submitting} className="mt-1 w-full">
          {uz.auth.register}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-[12px] text-content-faint">
        <span className="h-px flex-1 bg-ink-750" />
        {uz.auth.orContinue}
        <span className="h-px flex-1 bg-ink-750" />
      </div>

      <GoogleButton onCredential={handleGoogle} />

      <p className="mt-6 text-center text-[13px] text-content-muted">
        {uz.auth.haveAccount}{' '}
        <Link to="/login" className="font-semibold text-accent hover:text-accent-dim">
          {uz.auth.login}
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
