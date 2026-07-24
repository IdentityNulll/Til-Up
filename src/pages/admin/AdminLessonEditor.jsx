import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import { ArrowLeftIcon } from '../../components/ui/icons.jsx';
import {
  getLessonMeta,
  updateLesson,
  uploadLessonPdf,
  deleteLessonPdf,
  getLessonQuestions,
  createQuestion,
  deleteQuestion,
} from '../../api/adminApi.js';
import { uz } from '../../locales/uz.js';

const TYPE_LABEL = { mcq: uz.admin.typeMcq, truefalse: uz.admin.typeTruefalse, fill: uz.admin.typeFill };

const emptyQuestion = () => ({ type: 'mcq', prompt: '', options: ['', '', '', ''], answer: 0, fillAnswer: '' });

const QuestionForm = ({ lessonId, onCreated }) => {
  const [q, setQ] = useState(emptyQuestion());
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!q.prompt.trim()) return;
    setBusy(true);
    try {
      let payload = { type: q.type, prompt: q.prompt.trim() };
      if (q.type === 'mcq') {
        const options = q.options.map((o) => o.trim()).filter(Boolean);
        if (options.length < 2) return;
        payload = { ...payload, options, answer: Math.min(q.answer, options.length - 1) };
      } else if (q.type === 'truefalse') {
        payload = { ...payload, options: [uz.admin.truthy, uz.admin.falsy], answer: q.answer };
      } else {
        if (!q.fillAnswer.trim()) return;
        payload = { ...payload, answer: q.fillAnswer.trim() };
      }
      await createQuestion(lessonId, payload);
      setQ(emptyQuestion());
      onCreated();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="flex flex-col gap-3">
      <p className="text-sm font-bold text-content-strong">{uz.admin.addQuestion}</p>
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-content">{uz.admin.questionType}</span>
        <select
          value={q.type}
          onChange={(e) => setQ({ ...emptyQuestion(), type: e.target.value })}
          className="w-full rounded-xl2 border border-ink-750 bg-ink-900 px-4 py-3 text-[15px] font-semibold text-content-strong outline-none focus:border-accent"
        >
          <option value="mcq">{uz.admin.typeMcq}</option>
          <option value="truefalse">{uz.admin.typeTruefalse}</option>
          <option value="fill">{uz.admin.typeFill}</option>
        </select>
      </label>

      <Input
        label={uz.admin.prompt}
        value={q.prompt}
        onChange={(e) => setQ((s) => ({ ...s, prompt: e.target.value }))}
      />

      {q.type === 'mcq' &&
        q.options.map((opt, i) => (
          <label key={i} className="flex items-center gap-2">
            <input
              type="radio"
              name="correct"
              checked={q.answer === i}
              onChange={() => setQ((s) => ({ ...s, answer: i }))}
              className="h-4 w-4 accent-accent"
            />
            <input
              value={opt}
              placeholder={`${uz.admin.option} ${i + 1}`}
              onChange={(e) =>
                setQ((s) => ({ ...s, options: s.options.map((o, oi) => (oi === i ? e.target.value : o)) }))
              }
              className="flex-1 rounded-xl border border-ink-750 bg-ink-900 px-3 py-2 text-sm text-content-strong outline-none focus:border-accent"
            />
          </label>
        ))}

      {q.type === 'truefalse' && (
        <div className="flex gap-2">
          {[uz.admin.truthy, uz.admin.falsy].map((lbl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setQ((s) => ({ ...s, answer: i }))}
              className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold ${
                q.answer === i ? 'border-accent bg-accent-soft text-accent' : 'border-ink-750 text-content-muted'
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
      )}

      {q.type === 'fill' && (
        <Input
          label={uz.admin.correct}
          value={q.fillAnswer}
          onChange={(e) => setQ((s) => ({ ...s, fillAnswer: e.target.value }))}
        />
      )}

      <Button size="sm" onClick={submit} disabled={busy} className="self-start">
        {uz.admin.addQuestion}
      </Button>
    </Card>
  );
};

const AdminLessonEditor = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [lesson, setLesson] = useState(undefined);
  const [questions, setQuestions] = useState([]);
  const [threshold, setThreshold] = useState(70);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const [meta, qs] = await Promise.all([getLessonMeta(courseId, lessonId), getLessonQuestions(lessonId)]);
    setLesson(meta || null);
    setThreshold(meta?.passThreshold ?? 70);
    setQuestions(qs);
  };
  useEffect(() => {
    load();
  }, [courseId, lessonId]);

  const onPdf = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadLessonPdf(lessonId, file);
      await load();
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  if (lesson === undefined) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={() => navigate(`/admin/courses/${courseId}`)}
        className="flex items-center gap-1.5 self-start text-sm font-semibold text-content-muted hover:text-content-strong"
      >
        <ArrowLeftIcon width={16} height={16} />
        {uz.admin.manageContent}
      </button>

      <h1 className="text-2xl font-extrabold">{lesson?.title || uz.admin.editLesson}</h1>

      {/* PDF */}
      <Card className="flex flex-col gap-3">
        <p className="text-sm font-bold text-content-strong">{uz.admin.pdf}</p>
        <p className="text-[13px] text-content-muted">{lesson?.pdfName || uz.admin.noPdf}</p>
        <input ref={fileRef} type="file" accept="application/pdf" onChange={onPdf} className="hidden" />
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" disabled={uploading} onClick={() => fileRef.current?.click()}>
            {uploading ? uz.common.loading : lesson?.pdfName ? uz.admin.replacePdf : uz.admin.uploadPdf}
          </Button>
          {lesson?.pdfName && (
            <button
              type="button"
              onClick={async () => {
                await deleteLessonPdf(lessonId);
                load();
              }}
              className="text-[13px] font-semibold text-content-faint hover:text-red-600"
            >
              {uz.admin.removePdf}
            </button>
          )}
        </div>
      </Card>

      {/* Pass threshold */}
      <Card className="flex items-end gap-3">
        <div className="flex-1">
          <Input
            label={uz.admin.passThreshold}
            type="number"
            min={0}
            max={100}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
        </div>
        <Button size="sm" onClick={() => updateLesson(lessonId, { passThreshold: threshold })}>
          {uz.admin.saveThreshold}
        </Button>
      </Card>

      {/* Questions */}
      <div className="flex flex-col gap-2.5">
        <p className="px-1 text-sm font-bold text-content">
          {uz.admin.questions} ({questions.length})
        </p>
        {questions.length === 0 && (
          <Card className="text-center text-sm text-content-muted">{uz.admin.noQuestions}</Card>
        )}
        {questions.map((q, i) => (
          <Card key={q._id} className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-accent">
                {TYPE_LABEL[q.type]}
              </p>
              <p className="font-semibold text-content-strong">
                {i + 1}. {q.prompt}
              </p>
              {q.type !== 'fill' && (
                <p className="mt-1 text-[13px] text-content-muted">
                  {q.options.map((o, oi) => (oi === q.answer ? `✓ ${o}` : o)).join(' · ')}
                </p>
              )}
              {q.type === 'fill' && <p className="mt-1 text-[13px] text-content-muted">✓ {q.answer}</p>}
            </div>
            <button
              type="button"
              onClick={async () => {
                await deleteQuestion(q._id);
                load();
              }}
              className="text-[13px] font-semibold text-content-faint hover:text-red-600"
            >
              {uz.admin.delete}
            </button>
          </Card>
        ))}
      </div>

      <QuestionForm lessonId={lessonId} onCreated={load} />
    </div>
  );
};

export default AdminLessonEditor;
