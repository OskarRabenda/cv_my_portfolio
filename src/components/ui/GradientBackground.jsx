import './GradientBackground.css';

// Base vertical color stops (percent positions). `offset` shifts them all
// down, so a larger offset pushes the gradient — and where it ends — lower.
const BASE_STOPS = [
  ['var(--grad-0)', 0],
  ['var(--grad-1)', 20],
  ['var(--grad-2)', 40],
  ['var(--grad-3)', 70],
  ['var(--grad-4)', 100],
];

export function GradientBackground({ children, offset = 53, className = '' }) {
  const gradient = `linear-gradient(180deg, ${BASE_STOPS.map(
    ([color, pos]) => `${color} ${pos + offset}%`
  ).join(', ')})`;

  return (
    <div className={`gradient-bg ${className}`}>
      {/* Main gradient background */}
      <div className="gradient-bg__layer gradient-bg__base" style={{ background: gradient }} />
      {/* Subtle noise texture */}
      <div className="gradient-bg__layer gradient-bg__noise" />
      {/* Geometric grid overlay */}
      <div className="gradient-bg__layer gradient-bg__grid" />
      {/* Diagonal lines overlay for additional texture */}
      <div className="gradient-bg__layer gradient-bg__diagonal" />
      {/* Content */}
      <div className="gradient-bg__content">{children}</div>
    </div>
  );
}
