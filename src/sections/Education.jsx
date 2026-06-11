import { Section, Card } from '../components/primitives/index.js';
import { cv } from '../data/cv.js';
import './Timeline.css';

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="timeline">
        {cv.education.map((item) => (
          <Card key={`${item.school}-${item.period}`}>
            <div className="timeline__heading">
              <h3>
                {item.degree} · <span className="timeline__org">{item.school}</span>
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
