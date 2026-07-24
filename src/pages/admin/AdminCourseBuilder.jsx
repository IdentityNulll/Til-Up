import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import { ArrowLeftIcon } from '../../components/ui/icons.jsx';
import {
  getCourseDetail,
  createModule,
  deleteModule,
  createLesson,
  deleteLesson,
} from '../../api/adminApi.js';
import { uz } from '../../locales/uz.js';

const AdminCourseBuilder = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [moduleTitle, setModuleTitle] = useState('');
  const [lessonInputs, setLessonInputs] = useState({}); // moduleId -> title

  const load = () => getCourseDetail(courseId).then(setData).catch(() => {});
  useEffect(() => {
    load();
  }, [courseId]);

  if (!data) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { course, modules, lessons } = data;
  const lessonsByModule = (mid) =>
    lessons.filter((l) => String(l.module) === String(mid)).sort((a, b) => a.order - b.order);

  const addModule = async (e) => {
    e.preventDefault();
    if (!moduleTitle.trim()) return;
    await createModule({ course: courseId, title: moduleTitle.trim(), order: modules.length });
    setModuleTitle('');
    load();
  };

  const addLesson = async (mid) => {
    const title = (lessonInputs[mid] || '').trim();
    if (!title) return;
    await createLesson({ module: mid, title, order: lessonsByModule(mid).length });
    setLessonInputs((s) => ({ ...s, [mid]: '' }));
    load();
  };

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={() => navigate('/admin/courses')}
        className="flex items-center gap-1.5 self-start text-sm font-semibold text-content-muted hover:text-content-strong"
      >
        <ArrowLeftIcon width={16} height={16} />
        {uz.admin.courses}
      </button>

      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-accent-soft text-2xl">
          {course.emoji}
        </span>
        <h1 className="text-2xl font-extrabold">{course.title}</h1>
      </div>

      {modules
        .sort((a, b) => a.order - b.order)
        .map((m, i) => (
          <Card key={m._id} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="font-bold text-content-strong">
                {i + 1}. {m.title}
              </p>
              <button
                type="button"
                onClick={async () => {
                  await deleteModule(m._id);
                  load();
                }}
                className="text-[13px] font-semibold text-content-faint hover:text-red-600"
              >
                {uz.admin.delete}
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {lessonsByModule(m._id).map((l) => (
                <div
                  key={l._id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-ink-750 bg-ink-850 px-3 py-2"
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/admin/courses/${courseId}/lessons/${l._id}`)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    <span className="truncate text-sm text-content hover:text-accent">{l.title}</span>
                    {l.pdfName && <span title={l.pdfName}>📄</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/admin/courses/${courseId}/lessons/${l._id}`)}
                    className="shrink-0 text-[12px] font-semibold text-accent"
                  >
                    {uz.admin.edit}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteLesson(l._id);
                      load();
                    }}
                    className="shrink-0 text-[12px] font-semibold text-content-faint hover:text-red-600"
                  >
                    {uz.admin.delete}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder={uz.admin.newLesson}
                  value={lessonInputs[m._id] || ''}
                  onChange={(e) => setLessonInputs((s) => ({ ...s, [m._id]: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && addLesson(m._id)}
                />
              </div>
              <Button size="sm" variant="secondary" onClick={() => addLesson(m._id)}>
                {uz.admin.addLesson}
              </Button>
            </div>
          </Card>
        ))}

      <Card>
        <form onSubmit={addModule} className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder={uz.admin.moduleTitle}
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
            />
          </div>
          <Button size="sm" type="submit">
            {uz.admin.addModule}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminCourseBuilder;
