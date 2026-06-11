import './Button.css';

export default function Button({ href, onClick, variant = 'primary', children }) {
  const className = `button button--${variant}`;
  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
