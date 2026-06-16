import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider.jsx';
import { GradientBackground } from './components/ui/GradientBackground.jsx';
import { NavBar } from './components/ui/NavBar.jsx';
import { HomeButton } from './components/ui/HomeButton.jsx';
import { ThemeSwitcher } from './components/ui/ThemeSwitcher.jsx';
import Hero from './sections/Hero.jsx';
import Contact from './pages/Contact.jsx';

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
        </Routes>
        <ThemeSwitcher />
      </BrowserRouter>
    </ThemeProvider>
  );
}
