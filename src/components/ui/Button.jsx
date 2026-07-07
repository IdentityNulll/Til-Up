const VARIANTS = {
  primary: 'bg-accent text-obsidian-950 hover:bg-accent-bright shadow-glow',
  secondary: 'bg-obsidian-700 text-gray-100 hover:bg-obsidian-600',
  ghost: 'bg-transparent text-gray-300 hover:bg-obsidian-800',
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <button
      className={`w-full rounded-xl2 px-5 py-3 font-semibold transition-colors duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
