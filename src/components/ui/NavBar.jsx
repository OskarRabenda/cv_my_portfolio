import { useNavigate } from 'react-router-dom';
import { LiquidGlassButton, GlassFilter } from './LiquidGlassButton.jsx';
import './NavBar.css';

// `to` makes a button navigate; the rest are non-functional for now.
const LINKS = [
  { label: 'Education' },
  { label: 'Projects' },
  { label: 'Skillset' },
  { label: 'Contact', to: '/contact' },
  { label: 'About me', to: '/about' },
];

export function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {LINKS.map((link) => (
          <li key={link.label}>
            <LiquidGlassButton onClick={() => link.to && navigate(link.to)}>
              {link.label}
            </LiquidGlassButton>
          </li>
        ))}
      </ul>
      {/* SVG filter definition referenced by every glass button */}
      <GlassFilter />
    </nav>
  );
}
