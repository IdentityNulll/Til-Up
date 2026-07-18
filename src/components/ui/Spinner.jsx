const Spinner = ({ className = '', size = 32 }) => (
  <div
    style={{ width: size, height: size }}
    className={`animate-spin rounded-full border-2 border-ink-700 border-t-accent ${className}`}
  />
);

export default Spinner;
