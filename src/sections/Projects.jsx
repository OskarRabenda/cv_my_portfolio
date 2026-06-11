import { Section, Card, Tag } from '../components/primitives/index.js';
import { cv } from '../data/cv.js';
import './Projects.css';

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="projects">
        {cv.projects.map((project) => (
          <Card key={project.name}>
            <h3>
              {project.link ? <a href={project.link}>{project.name}</a> : project.name}
            </h3>
            <p className="projects__description">{project.description}</p>
            <div className="projects__tags">
              {project.tech.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
