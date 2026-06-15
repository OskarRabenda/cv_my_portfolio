import './GradientBackground.css';

// Base vertical color stops (percent positions). `offset` shifts them all
// down, so a larger offset pushes the gradient — and where it ends — lower.
const BASE_STOPS = [
  ['#000000', 0],
  ['#05080f', 20],
  ['#032f3a', 40],
  ['#0891b2', 70],
  ['#22d3ee', 100],
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
