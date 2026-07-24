import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import OptionCard from '../components/ui/OptionCard.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import { CheckIcon, ArrowLeftIcon } from '../components/ui/icons.jsx';
import { getLesson, submitQuiz, getPdfObjectUrl, completeNode } from '../api/coursesApi.js';
import { uz } from '../locales/uz.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [phase, setPhase] = useState('material'); // material | quiz | result
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let url;
    getLesson(courseId, lessonId)
      .then(async (d) => {
        setData(d);
        if (d.lesson.pdfFileId) {
          url = await getPdfObjectUrl(d.lesson.pdfFileId).catch(() => null);
          setPdfUrl(url);
        }
      })
      .catch(() => setData({ lesson: null, questions: [], completed: false }));
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [courseId, lessonId]);

  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!data.lesson) {
    return <Card className="text-center text-sm text-content-muted">{uz.common.error}</Card>;
  }

  const { lesson, questions } = data;
  const backToCourse = () => navigate(`/courses/${courseId}`);

  const finishNoQuiz = async () => {
    setBusy(true);
    try {
      await completeNode(courseId, lessonId);
      backToCourse();
    } finally {
      setBusy(false);
    }
  };

  const submit = async () => {
    setBusy(true);
    try {
      const r = await submitQuiz(courseId, lessonId, answers);
      setResult(r);
      setPhase('result');
    } finally {
      setBusy(false);
    }
  };

  const Header = (
    <button
      type="button"
      onClick={backToCourse}
      className="flex items-center gap-1.5 self-start text-sm font-semibold text-content-muted hover:text-content-strong"
    >
      <ArrowLeftIcon width={16} height={16} />
      {uz.lesson.backToCourse}
    </button>
  );

  // ---- Result -----------------------------------------------------------
  if (phase === 'result' && result) {
    return (
      <div className="flex flex-col gap-6">
        {Header}
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full text-3xl ${
              result.passed ? 'bg-accent-grad text-ink-base shadow-glow' : 'bg-red-100 text-red-600'
            }`}
          >
            {result.passed ? <CheckIcon width={38} height={38} strokeWidth={2.6} /> : '↺'}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">
              {result.passed ? uz.lesson.passed : uz.lesson.failed}
            </h1>
            <p className="mt-1 text-content-muted">
              {uz.lesson.scoreLabel}: <span className="font-bold text-content-strong">{result.score}%</span>{' '}
              ({result.correct}/{result.total})
            </p>
          </div>
          {result.passed ? (
            <Button size="lg" onClick={backToCourse} className="w-full max-w-xs">
              {uz.lesson.backToCourse}
            </Button>
          ) : (
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Button
                size="lg"
                onClick={() => {
                  setAnswers({});
                  setResult(null);
                  setPhase('material');
                }}
              >
                {uz.lesson.reviewPdf}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---- Quiz -------------------------------------------------------------
  if (phase === 'quiz') {
    const allAnswered = questions.every((q) => answers[q.id] !== undefined && answers[q.id] !== '');
    return (
      <div className="flex flex-col gap-5">
        {Header}
        <h1 className="text-2xl font-extrabold">{uz.lesson.quiz}</h1>
        {questions.map((q, qi) => (
          <Card key={q.id} className="flex flex-col gap-3">
            <p className="font-semibold text-content-strong">
              {qi + 1}. {q.prompt}
            </p>
            {q.type === 'fill' ? (
              <Input
                placeholder={uz.lesson.yourAnswer}
                value={answers[q.id] || ''}
                onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
              />
            ) : (
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => (
                  <OptionCard
                    key={oi}
                    selected={answers[q.id] === oi}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                    emblem={LETTERS[oi]}
                    title={opt}
                  />
                ))}
              </div>
            )}
          </Card>
        ))}
        <Button size="lg" disabled={!allAnswered || busy} onClick={submit} className="w-full">
          {uz.lesson.submit}
        </Button>
      </div>
    );
  }

  // ---- Material (PDF) ---------------------------------------------------
  return (
    <div className="flex flex-col gap-5">
      {Header}
      <div>
        <h1 className="text-2xl font-extrabold">{lesson.title}</h1>
        {data.completed && <p className="mt-1 text-sm text-accent">{uz.lesson.alreadyDone}</p>}
      </div>

      <Card padded={false} className="overflow-hidden">
        <p className="border-b border-ink-750 px-4 py-2.5 text-sm font-bold text-content-strong">
          {uz.lesson.material}
        </p>
        {pdfUrl ? (
          <object data={pdfUrl} type="application/pdf" className="h-[70vh] w-full">
            <iframe src={pdfUrl} title={lesson.title} className="h-[70vh] w-full" />
          </object>
        ) : lesson.content ? (
          <div className="whitespace-pre-wrap px-4 py-4 text-[15px] leading-relaxed text-content">
            {lesson.content}
          </div>
        ) : (
          <p className="px-4 py-10 text-center text-sm text-content-muted">{uz.lesson.noPdf}</p>
        )}
      </Card>

      {questions.length > 0 ? (
        <Button size="lg" onClick={() => setPhase('quiz')} className="w-full">
          {uz.lesson.startQuiz}
        </Button>
      ) : (
        <Button size="lg" disabled={busy} onClick={finishNoQuiz} className="w-full">
          {uz.lesson.markDone}
        </Button>
      )}
    </div>
  );
};

export default LessonView;
