const Spinner = ({ className = '' }) => (
  <div
    className={`h-8 w-8 animate-spin rounded-full border-2 border-obsidian-600 border-t-accent ${className}`}
  />
);

export default Spinner;
