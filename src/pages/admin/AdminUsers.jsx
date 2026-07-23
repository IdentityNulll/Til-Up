import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import Avatar from '../../components/ui/Avatar.jsx';
import { getUsers, setUserRole } from '../../api/adminApi.js';
import { uz } from '../../locales/uz.js';

const ROLES = [
  { value: 'student', label: uz.admin.roleStudent },
  { value: 'teacher', label: uz.admin.roleTeacher },
  { value: 'admin', label: uz.admin.roleAdmin },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(null);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    getUsers().then(setUsers).catch(() => setUsers([]));
  }, []);

  const changeRole = async (id, role) => {
    setSavingId(id);
    try {
      const updated = await setUserRole(id, role);
      setUsers((list) => list.map((u) => (u._id === id ? { ...u, role: updated.role } : u)));
    } finally {
      setSavingId(null);
    }
  };

  if (!users) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-extrabold">{uz.admin.users}</h1>

      <div className="flex flex-col gap-2.5">
        {users.map((u) => (
          <Card key={u._id} className="flex items-center gap-3">
            <Avatar user={u} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-content-strong">{u.name}</p>
              <p className="truncate text-[13px] text-content-faint">{u.email}</p>
            </div>
            <select
              value={u.role}
              disabled={savingId === u._id}
              onChange={(e) => changeRole(u._id, e.target.value)}
              className="rounded-xl border border-ink-750 bg-ink-900 px-3 py-2 text-sm font-semibold text-content-strong outline-none focus:border-accent"
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
