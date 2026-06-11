import { cv } from '../../data/cv.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {cv.name}. Built with React.
      </p>
    </footer>
  );
}
