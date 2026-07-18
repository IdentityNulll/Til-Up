const VARIANTS = {
  primary:
    'bg-accent-grad text-ink-base font-bold shadow-glow-sm hover:brightness-110 active:brightness-95',
  secondary:
    'border border-ink-700 bg-ink-800 text-content-strong hover:bg-ink-750 hover:border-ink-600',
  ghost: 'text-content-muted hover:text-content-strong hover:bg-ink-800/60',
};

const SIZES = {
  md: 'px-5 py-3 text-[15px] rounded-xl2',
  lg: 'px-6 py-3.5 text-base rounded-xl2',
  sm: 'px-4 py-2 text-sm rounded-xl',
};

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-base active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
