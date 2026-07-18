// TilUp brand mark: a rounded obsidian tile with an ascending path ("til up").
export const LogoMark = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="tilup-mark" x1="8" y1="32" x2="32" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3ff0ac" />
        <stop offset="0.5" stopColor="#19cd8e" />
        <stop offset="1" stopColor="#2fd4c4" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="38" height="38" rx="11" fill="#0e1017" />
    <rect x="1" y="1" width="38" height="38" rx="11" stroke="url(#tilup-mark)" strokeOpacity="0.35" strokeWidth="1.5" />
    <path
      d="M10 26.5 L17 19.5 L22 24 L30 13.5"
      stroke="url(#tilup-mark)"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M25 13.5 L30 13.5 L30 18.5" stroke="url(#tilup-mark)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="26.5" r="1.8" fill="#3ff0ac" />
  </svg>
);

const Logo = ({ size = 32, showWord = true, className = '' }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <LogoMark size={size} />
    {showWord && (
      <span className="font-display text-xl font-extrabold tracking-tight text-content-strong">
        Til<span className="text-gradient">Up</span>
      </span>
    )}
  </div>
);

export default Logo;
