const Input = ({ label, className = '', ...props }) => (
  <label className="flex flex-col gap-1.5">
    {label && <span className="text-[13px] font-semibold text-content">{label}</span>}
    <input
      className={`w-full rounded-xl2 border border-ink-750 bg-ink-900 px-4 py-3 text-[15px] text-content-strong outline-none transition-colors placeholder:text-content-faint focus:border-accent focus:ring-2 focus:ring-accent/20 ${className}`}
      {...props}
    />
  </label>
);

export default Input;
