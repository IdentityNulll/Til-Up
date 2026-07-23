import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import { getAdminCourses, createCourse, deleteCourse } from '../../api/adminApi.js';
import { uz } from '../../locales/uz.js';

const AdminCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);
  const [form, setForm] = useState({ title: '', emoji: '📘', description: '' });
  const [busy, setBusy] = useState(false);

  const load = () => getAdminCourses().then(setCourses).catch(() => setCourses([]));
  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setBusy(true);
    try {
      await createCourse(form);
      setForm({ title: '', emoji: '📘', description: '' });
      await load();
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm(uz.admin.confirmDelete)) return;
    await deleteCourse(id);
    load();
  };

  if (!courses) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-extrabold">{uz.admin.courses}</h1>

      <Card>
        <p className="mb-3 text-sm font-bold text-content-strong">{uz.admin.newCourse}</p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Input
              name="emoji"
              value={form.emoji}
              onChange={onChange}
              className="w-16 text-center text-xl"
            />
            <div className="flex-1">
              <Input name="title" placeholder={uz.admin.courseTitle} value={form.title} onChange={onChange} />
            </div>
          </div>
          <Input name="description" placeholder={uz.admin.description} value={form.description} onChange={onChange} />
          <Button type="submit" size="sm" disabled={busy} className="self-start">
            {uz.admin.create}
          </Button>
        </form>
      </Card>

      <div className="flex flex-col gap-2.5">
        {courses.map((c) => (
          <Card key={c.id} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-xl">
              {c.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-content-strong">{c.title}</p>
              <p className="text-[13px] text-content-faint">{c.lessonCount} {uz.courses.lessons}</p>
            </div>
            <Button size="sm" variant="secondary" onClick={() => navigate(`/admin/courses/${c.id}`)}>
              {uz.admin.manageContent}
            </Button>
            <button
              type="button"
              onClick={() => remove(c.id)}
              className="rounded-lg px-2 py-1 text-[13px] font-semibold text-content-faint hover:text-red-600"
            >
              {uz.admin.delete}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
