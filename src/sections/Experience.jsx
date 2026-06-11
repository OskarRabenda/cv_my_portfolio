import { Section, Card } from '../components/primitives/index.js';
import { cv } from '../data/cv.js';
import './Timeline.css';

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="timeline">
        {cv.experience.map((item) => (
          <Card key={`${item.company}-${item.period}`}>
            <div className="timeline__heading">
              <h3>
                {item.role} · <span className="timeline__org">{item.company}</span>
              </h3>
              <span className="timeline__period">{item.period}</span>
            </div>
            <p className="timeline__description">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
