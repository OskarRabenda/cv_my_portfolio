import { NeuralNoise } from './components/ui/NeuralNoise.jsx';
import Hero from './sections/Hero.jsx';

export default function App() {
  return (
    <>
      <NeuralNoise color={[1.0, 0.1, 0.15]} opacity={0.85} />
      <Hero />
    </>
  );
}
