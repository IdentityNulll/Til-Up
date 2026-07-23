import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import { getOverview } from '../../api/adminApi.js';
import { uz } from '../../locales/uz.js';

const Tile = ({ label, value }) => (
  <Card className="text-center">
    <p className="text-3xl font-extrabold text-content-strong">{value}</p>
    <p className="mt-1 text-[13px] font-semibold uppercase tracking-wide text-content-faint">{label}</p>
  </Card>
);

const AdminOverview = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getOverview().then(setData).catch(() => setData({ courses: 0, students: 0, enrollments: 0 }));
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-extrabold">{uz.admin.overview}</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Tile label={uz.admin.coursesCount} value={data.courses} />
        <Tile label={uz.admin.studentsCount} value={data.students} />
        <Tile label={uz.admin.enrollmentsCount} value={data.enrollments} />
      </div>
    </div>
  );
};

export default AdminOverview;
