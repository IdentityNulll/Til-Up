const DailyGoalRing = ({ value = 0, goal = 50, size = 56, stroke = 6 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = goal > 0 ? Math.min(1, value / goal) : 0;
  const offset = circumference * (1 - percent);
  const done = percent >= 1;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e0e7e2"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#dailyGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        <defs>
          <linearGradient id="dailyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#1e7a49" />
            <stop offset="1" stopColor="#0f766e" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-content-strong">
        {done ? '✓' : `${Math.round(percent * 100)}%`}
      </span>
    </div>
  );
};

export default DailyGoalRing;
