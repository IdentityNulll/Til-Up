const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-xl2 border border-obsidian-700 bg-obsidian-900 p-5 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
