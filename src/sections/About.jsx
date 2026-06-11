import { Section } from '../components/primitives/index.js';
import { cv } from '../data/cv.js';

export default function About() {
  return (
    <Section id="about" title="About">
      <p>{cv.about}</p>
    </Section>
  );
}
