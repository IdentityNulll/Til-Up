import Card from '../components/ui/Card.jsx';
import { uz } from '../locales/uz.js';

const ComingSoon = ({ title }) => (
  <Card className="flex flex-col items-center gap-2 py-12 text-center">
    <span className="text-4xl">🚧</span>
    <h2 className="text-xl font-bold text-gray-100">{title}</h2>
    <p className="text-sm text-gray-500">{uz.common.comingSoon}</p>
  </Card>
);

export default ComingSoon;
