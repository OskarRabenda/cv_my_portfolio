import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider.jsx';
import { GradientBackground } from './components/ui/GradientBackground.jsx';
import { NavBar } from './components/ui/NavBar.jsx';
import { HomeButton } from './components/ui/HomeButton.jsx';
import { ThemeSwitcher } from './components/ui/ThemeSwitcher.jsx';
import Hero from './sections/Hero.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <NavBar />
        <HomeButton />
        <Routes>
          <Route
            path="/"
            element={
              <GradientBackground>
                <Hero />
              </GradientBackground>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <ThemeSwitcher />
      </BrowserRouter>
    </ThemeProvider>
  );
}
