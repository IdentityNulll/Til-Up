const Heart = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 20.5S3.5 15 3.5 8.9A4.4 4.4 0 0 1 12 6.8a4.4 4.4 0 0 1 8.5 2.1C20.5 15 12 20.5 12 20.5Z"
      fill={filled ? '#ff5a6a' : 'none'}
      stroke={filled ? '#ff5a6a' : '#c9d3cc'}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const HeartsIndicator = ({ hearts = 0, max = 5 }) => (
  <div className="flex items-center gap-1.5 rounded-full border border-ink-750 bg-ink-900/70 px-2.5 py-1">
    <Heart filled />
    <span className="text-sm font-bold text-content-strong">
      {hearts}
      <span className="text-content-faint">/{max}</span>
    </span>
  </div>
);

export default HeartsIndicator;
