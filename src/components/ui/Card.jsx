const Card = ({ children, className = '', raised = false, padded = true }) => {
  return (
    <div
      className={`${raised ? 'surface-raised' : 'surface'} ${padded ? 'p-5' : ''} ${className}`}
    >
      {/* top-lit hairline highlight */}
      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {children}
    </div>
  );
};

export default Card;
