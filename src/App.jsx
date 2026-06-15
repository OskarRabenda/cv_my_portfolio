import { ThemeProvider } from './theme/ThemeProvider.jsx';
import { GradientBackground } from './components/ui/GradientBackground.jsx';
import { NavBar } from './components/ui/NavBar.jsx';
import { ThemeSwitcher } from './components/ui/ThemeSwitcher.jsx';
import Hero from './sections/Hero.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <GradientBackground>
        <NavBar />
        <Hero />
      </GradientBackground>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
