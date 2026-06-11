import { Section, Tag } from '../components/primitives/index.js';
import { cv } from '../data/cv.js';
import './Skills.css';

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="skills">
        {cv.skills.map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </div>
    </Section>
  );
}
