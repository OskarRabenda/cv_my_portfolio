import { Button } from '../components/primitives/index.js';
import { cv } from '../data/cv.js';
import './Hero.css';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <h1 className="hero__name">{cv.name}</h1>
      <p className="hero__title">{cv.title}</p>
      <p className="hero__tagline">{cv.tagline}</p>
      <div className="hero__actions">
        <Button href="#contact">Get in touch</Button>
        <Button href={cv.links.github} variant="outline">
          GitHub
        </Button>
      </div>
    </section>
  );
}
