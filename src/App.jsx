import { GradientBackground } from './components/ui/GradientBackground.jsx';
import { NavBar } from './components/ui/NavBar.jsx';
import Hero from './sections/Hero.jsx';

export default function App() {
  return (
    <GradientBackground>
      <NavBar />
      <Hero />
    </GradientBackground>
  );
}
