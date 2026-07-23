import { useEffect, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import LevelBadge from '../components/ui/LevelBadge.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import DailyGoalRing from '../components/ui/DailyGoalRing.jsx';
import { FlameIcon, SparkIcon } from '../components/ui/icons.jsx';
import { getRoadmap } from '../api/roadmapApi.js';
import { updateProfile, changePassword } from '../api/userApi.js';
import { useAuth } from '../hooks/useAuth.js';
import { uz } from '../locales/uz.js';

const PROVIDER_LABEL = {
  local: uz.profile.providerLocal,
  google: uz.profile.providerGoogle,
  both: uz.profile.providerBoth,
};

const StatTile = ({ label, value, children }) => (
  <div className="surface flex flex-col items-center gap-1 p-4 text-center">
    {children}
    {value !== undefined && <p className="text-xl font-extrabold text-content-strong">{value}</p>}
    <p className="text-[11px] font-semibold uppercase tracking-wide text-content-faint">{label}</p>
  </div>
);

const ProfilePage = () => {
  const { user, setUser, logout } = useAuth();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoadmap()
      .then(setRoadmap)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const stats = roadmap?.stats || {};
  const allNodes = (roadmap?.modules || []).flatMap((m) => m.nodes);
  const done = allNodes.filter((n) => n.status === 'completed').length;
  const hasPassword = user.authProvider !== 'google';

  return (
    <div className="flex flex-col gap-6">
      <h1 className="px-1 text-2xl font-extrabold">{uz.profile.title}</h1>

      {/* Identity */}
      <Card raised className="flex items-center gap-4">
        <Avatar user={user} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-extrabold text-content-strong">{user.name}</p>
          <p className="truncate text-sm text-content-muted">{user.email}</p>
          <span className="mt-1.5 inline-block rounded-full border border-ink-700 bg-ink-850 px-2.5 py-0.5 text-[11px] font-semibold text-content-muted">
            {PROVIDER_LABEL[user.authProvider] || user.authProvider}
          </span>
        </div>
      </Card>

      {/* Status / stats */}
      <section className="flex flex-col gap-3">
        <h2 className="px-1 text-sm font-bold text-content">{uz.profile.statsTitle}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label={uz.profile.targetLevel}>
            <LevelBadge code={stats.currentLevel || user.targetLevel || 'C'} status="current" size="sm" />
          </StatTile>
          <StatTile label={uz.profile.xp} value={stats.xp ?? user.xp ?? 0}>
            <SparkIcon width={20} height={20} className="text-accent" />
          </StatTile>
          <StatTile label={uz.profile.streak} value={stats.streak ?? user.streakCount ?? 0}>
            <FlameIcon width={20} height={20} className="text-orange-400" />
          </StatTile>
          <StatTile label={uz.profile.dailyGoal}>
            <DailyGoalRing value={stats.dailyXp ?? 0} goal={stats.dailyGoalXp ?? 50} size={44} stroke={5} />
          </StatTile>
        </div>

        <Card className="mt-1">
          <div className="mb-1.5 flex items-center justify-between text-[13px] text-content-muted">
            <span>{uz.profile.progress}</span>
            <span className="font-semibold text-content">
              {done}/{allNodes.length || 0}
            </span>
          </div>
          <ProgressBar value={done} max={allNodes.length || 1} />
        </Card>
      </section>

      {/* Settings */}
      <section className="flex flex-col gap-3">
        <h2 className="px-1 text-sm font-bold text-content">{uz.profile.settingsTitle}</h2>
        <NameForm user={user} onUpdated={setUser} />
        <PasswordForm hasPassword={hasPassword} />
        <Button variant="secondary" onClick={logout} className="w-full text-red-600">
          {uz.profile.logout}
        </Button>
      </section>
    </div>
  );
};

const NameForm = ({ user, onUpdated }) => {
  const [name, setName] = useState(user.name || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    if (!name.trim() || name.trim() === user.name) return;
    setSaving(true);
    setSaved(false);
    try {
      const updated = await updateProfile({ name: name.trim() });
      onUpdated(updated);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="flex flex-col gap-3">
      <Input label={uz.profile.nameLabel} value={name} onChange={(e) => setName(e.target.value)} />
      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={saving} size="sm">
          {uz.profile.save}
        </Button>
        {saved && <span className="text-[13px] text-accent">{uz.profile.saved}</span>}
      </div>
    </Card>
  );
};

const PasswordForm = ({ hasPassword }) => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const [saving, setSaving] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    if (form.newPassword !== form.confirm) {
      setErr(uz.profile.passwordMismatch);
      return;
    }
    setSaving(true);
    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setMsg(uz.profile.passwordChanged);
      setForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (e2) {
      setErr(e2.response?.data?.message || uz.auth.genericError);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <p className="text-sm font-bold text-content-strong">
          {hasPassword ? uz.profile.changePassword : uz.profile.setPassword}
        </p>
        {err && <p className="text-[13px] text-red-600">{err}</p>}
        {msg && <p className="text-[13px] text-accent">{msg}</p>}
        {hasPassword && (
          <Input
            label={uz.profile.currentPassword}
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            value={form.currentPassword}
            onChange={onChange}
            required
          />
        )}
        <Input
          label={uz.profile.newPassword}
          name="newPassword"
          type="password"
          autoComplete="new-password"
          value={form.newPassword}
          onChange={onChange}
          minLength={6}
          required
        />
        <Input
          label={uz.profile.confirmPassword}
          name="confirm"
          type="password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={onChange}
          minLength={6}
          required
        />
        <Button type="submit" disabled={saving} size="sm" className="self-start">
          {hasPassword ? uz.profile.changePassword : uz.profile.setPassword}
        </Button>
      </form>
    </Card>
  );
};

export default ProfilePage;
