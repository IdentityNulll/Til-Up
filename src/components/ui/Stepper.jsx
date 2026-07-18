const Stepper = ({ current, total }) => {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
            index < current
              ? 'bg-accent'
              : index === current
                ? 'bg-accent-grad shadow-glow-sm'
                : 'bg-ink-750'
          }`}
        />
      ))}
    </div>
  );
};

export default Stepper;
