const TopBar = ({ title }) => {
  return (
    <header className="safe-top sticky top-0 z-10 border-b border-obsidian-700 bg-obsidian-900/95 px-5 py-4 backdrop-blur">
      <h1 className="text-lg font-bold text-gray-100">{title}</h1>
    </header>
  );
};

export default TopBar;
