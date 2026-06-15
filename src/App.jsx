import { NeuralNoise } from './components/ui/NeuralNoise.jsx';
import Hero from './sections/Hero.jsx';

export default function App() {
  return (
    <>
      <NeuralNoise color={[0.35, 0.55, 1.0]} opacity={0.85} />
      <Hero />
    </>
  );
}
