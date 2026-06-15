import Globe from '../components/globe/Globe.jsx';
import { cv } from '../data/cv.js';
import './Hero.css';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__intro">
        <h1 className="hero__name">{cv.name}</h1>
        <p className="hero__subtitle">{cv.title}</p>
      </div>
      <div className="hero__globe">
        <Globe size={530} />
      </div>
    </section>
  );
}
