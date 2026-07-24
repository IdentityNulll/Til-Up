import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import { BookIcon, ArrowRightIcon } from '../components/ui/icons.jsx';
import { listCourses } from '../api/coursesApi.js';
import { uz } from '../locales/uz.js';

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    listCourses()
      .then(setCourses)
      .catch(() => setCourses([]));
  }, []);

  if (!courses) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="px-1">
        <h1 className="text-2xl font-extrabold">{uz.courses.title}</h1>
        <p className="mt-1 text-sm text-content-muted">{uz.courses.subtitle}</p>
      </div>

      {courses.length === 0 ? (
        <Card className="text-center text-sm text-content-muted">{uz.courses.empty}</Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {courses.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => navigate(`/courses/${c.id}`)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.99 }}
              className="surface flex flex-col gap-3 p-5 text-left transition-colors hover:border-accent/40"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-accent-soft text-2xl">
                  {c.emoji}
                </span>
                <div className="flex items-center gap-1.5">
                  {c.category && (
                    <span className="rounded-full border border-ink-700 bg-ink-850 px-2.5 py-0.5 text-[11px] font-semibold text-content-muted">
                      {c.category}
                    </span>
                  )}
                  {c.enrolled && (
                    <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                      {uz.courses.enrolled}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-content-strong">{c.title}</p>
                <p className="mt-0.5 line-clamp-2 text-[13px] text-content-muted">{c.description}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-1">
                <span className="flex items-center gap-1.5 text-[13px] text-content-faint">
                  <BookIcon width={15} height={15} />
                  {c.lessonCount} {uz.courses.lessons}
                </span>
                <span className="flex items-center gap-1 text-[13px] font-semibold text-accent">
                  {c.enrolled ? uz.courses.open : uz.courses.start}
                  <ArrowRightIcon width={15} height={15} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
