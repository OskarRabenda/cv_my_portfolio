import './Section.css';

export default function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      {title && <h2 className="section__title">{title}</h2>}
      {children}
    </section>
  );
}
