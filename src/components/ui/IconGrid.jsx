import './IconGrid.css';

// Adapted from the framer-motion icon-set: same staggered fade-in, done in CSS.
// Each item may carry an `href`; if present the tile becomes a link.
export function IconGrid({ items, className = '' }) {
  return (
    <div className={`icon-grid ${className}`}>
      {items.map((item, i) => {
        const style = { animationDelay: `${i * 0.08}s` };
        const isExternal = item.href && item.href.startsWith('http');
        const tile = <span className="icon-grid__tile">{item.icon}</span>;

        return item.href ? (
          <a
            key={item.id}
            className="icon-grid__item"
            href={item.href}
            aria-label={item.name}
            title={item.name}
            style={style}
            {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {tile}
          </a>
        ) : (
          <div key={item.id} className="icon-grid__item" aria-label={item.name} style={style}>
            {tile}
          </div>
        );
      })}
    </div>
  );
}
