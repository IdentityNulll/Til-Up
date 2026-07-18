const StepHeader = ({ icon, title, subtitle }) => (
  <div className="flex flex-col gap-2">
    {icon && (
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-bright">
        {icon}
      </span>
    )}
    <h2 className="text-xl font-extrabold leading-snug">{title}</h2>
    {subtitle && <p className="text-[14px] leading-relaxed text-content-muted">{subtitle}</p>}
  </div>
);

export default StepHeader;
