import { useState } from 'react';
import { cv } from '../data/cv.js';
import './About.css';

const PARAGRAPHS = [
  'My name is Oskar Rabenda. Born on 15 December 2007 in Wroclaw, Poland.',
  "I graduated from an International Baccalaureate high school before relocating to the Netherlands at the age of 17 to pursue a Bachelor's degree in Computer Science and Engineering at Eindhoven University of Technology (TU/e).",
  'I am an ambitious and driven student with a particular interest in cybersecurity and AI, eager to grow both academically and professionally in these fields.',
];

export default function About() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="about-page">
      <div className="about-content">
        <header className="about-head">
          <div className="about-avatar">
            {imgOk ? (
              <img src="/avatar.jpg" alt={cv.name} onError={() => setImgOk(false)} />
            ) : (
              <span className="about-avatar__initials">OR</span>
            )}
          </div>
          <span className="about-name">{cv.name}</span>
        </header>

        <div className="about-text">
          {PARAGRAPHS.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
