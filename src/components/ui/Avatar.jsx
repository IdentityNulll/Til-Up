const initials = (user) => {
  const src = user?.name || user?.email || '?';
  return src.trim().slice(0, 1).toUpperCase();
};

const SIZES = { sm: 'h-9 w-9 text-sm', md: 'h-12 w-12 text-lg', lg: 'h-20 w-20 text-3xl' };

const Avatar = ({ user, size = 'md', className = '' }) => {
  if (user?.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.name || ''}
        referrerPolicy="no-referrer"
        className={`shrink-0 rounded-full object-cover ${SIZES[size]} ${className}`}
      />
    );
  }
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-accent-grad font-bold text-ink-base ${SIZES[size]} ${className}`}
    >
      {initials(user)}
    </span>
  );
};

export default Avatar;
