import { Section, Button } from '../components/primitives/index.js';
import { cv } from '../data/cv.js';
import './Contact.css';

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="contact__text">
        Based in {cv.location}. Feel free to reach out by email or connect online.
      </p>
      <div className="contact__actions">
        <Button href={`mailto:${cv.email}`}>Email me</Button>
        <Button href={cv.links.linkedin} variant="outline">
          LinkedIn
        </Button>
        <Button href={cv.links.github} variant="outline">
          GitHub
        </Button>
      </div>
    </Section>
  );
}
