import { LiquidGlassButton, GlassFilter } from './LiquidGlassButton.jsx';
import './NavBar.css';

// Non-functional for now — these will route to their own pages later.
const LINKS = ['Education', 'Projects', 'Skillset', 'Contact', 'About me'];

export function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {LINKS.map((label) => (
          <li key={label}>
            <LiquidGlassButton>{label}</LiquidGlassButton>
          </li>
        ))}
      </ul>
      {/* SVG filter definition referenced by every glass button */}
      <GlassFilter />
    </nav>
  );
}
