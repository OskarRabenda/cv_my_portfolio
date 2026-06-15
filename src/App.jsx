import { useState } from 'react';
import { GradientBackground } from './components/ui/GradientBackground.jsx';
import Hero from './sections/Hero.jsx';

export default function App() {
  const [offset, setOffset] = useState(15);

  return (
    <GradientBackground offset={offset}>
      <Hero />

      {/* Temporary preview control: drag to find the gradient end you like */}
      <div className="gradient-slider">
        <label className="gradient-slider__label">
          Gradient end offset: {offset}%
        </label>
        <input
          className="gradient-slider__input"
          type="range"
          min="-30"
          max="60"
          step="1"
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
        />
      </div>
    </GradientBackground>
  );
}
