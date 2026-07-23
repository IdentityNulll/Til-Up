import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import { getEnrollments } from '../../api/adminApi.js';
import { uz } from '../../locales/uz.js';

const AdminStudents = () => {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    getEnrollments().then(setRows).catch(() => setRows([]));
  }, []);

  if (!rows) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-extrabold">{uz.admin.students}</h1>

      {rows.length === 0 ? (
        <Card className="text-center text-sm text-content-muted">{uz.admin.noRows}</Card>
      ) : (
        <div className="flex flex-col gap-2.5">
          {rows.map((r) => (
            <Card key={r.id} className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-content-strong">{r.student.name}</p>
                <p className="truncate text-[13px] text-content-faint">{r.student.email}</p>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-content-muted sm:w-48">
                <span>{r.course.emoji}</span>
                <span className="truncate">{r.course.title}</span>
              </div>
              <div className="sm:w-52">
                <div className="mb-1 flex items-center justify-between text-[12px] text-content-muted">
                  <span>{uz.admin.progress}</span>
                  <span className="font-semibold text-content">
                    {r.completed}/{r.total} · {r.percent}%
                  </span>
                </div>
                <ProgressBar value={r.completed} max={r.total || 1} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
