import './LiquidGlassButton.css';

// Faithful plain-CSS recreation of the LiquidButton (default variant, glass look):
//  - layered inset highlight/shadow ring
//  - SVG turbulence + displacement backdrop distortion (#container-glass)
//  - scale-up on hover
export function LiquidGlassButton({ children, className = '', ...props }) {
  return (
    <button type="button" className={`liquid-button ${className}`} {...props}>
      {/* Glass edge highlight / inset shadow ring */}
      <span className="liquid-button__shadow" aria-hidden="true" />
      {/* Distorts the background behind the button */}
      <span
        className="liquid-button__glass"
        aria-hidden="true"
        style={{ backdropFilter: 'url("#container-glass")', WebkitBackdropFilter: 'url("#container-glass")' }}
      />
      <span className="liquid-button__content">{children}</span>
    </button>
  );
}

// Render this once on the page; the buttons reference its filter by id.
export function GlassFilter() {
  return (
    <svg className="liquid-glass-filter" aria-hidden="true">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* Generate turbulent noise for distortion */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          {/* Blur the turbulence pattern slightly */}
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          {/* Displace the source graphic with the noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          {/* Apply overall blur on the final result */}
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
