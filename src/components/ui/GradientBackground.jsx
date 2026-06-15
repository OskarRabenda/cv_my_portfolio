import './GradientBackground.css';

export function GradientBackground({ children, className = '' }) {
  return (
    <div className={`gradient-bg ${className}`}>
      {/* Main gradient background */}
      <div className="gradient-bg__layer gradient-bg__base" />
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
