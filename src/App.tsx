import { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { LiquidGlassCursor } from './components/LiquidGlassCursor';
import { Home } from './pages/Home';
import { ProjectDetails } from './pages/ProjectDetails';
import { Preloader } from './components/Preloader';
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from "@vercel/analytics/react"

// Scroll to top on route change
// Scroll to top or hash on route change
const ScrollToAnchor = () => {
  const { pathname, hash, state } = useLocation() as ReturnType<typeof useLocation> & { state: any };
  const navType = useNavigationType();

  useLayoutEffect(() => {
    // If user clicked the browser's Back button, let the browser restore scroll
    if (navType === 'POP') {
      window.history.scrollRestoration = 'auto';
      return;
    }
    
    window.history.scrollRestoration = 'manual';
    
    if (!(state as any)?.scrollTo && !hash) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname, state, hash, navType]);

  useEffect(() => {
    // Do not override scroll if it's a Back/Forward navigation
    if (navType === 'POP') return;

    if ((state as any)?.scrollTo) {
      const element = document.getElementById((state as any).scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
      return;
    }

    if (pathname === '/') {
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  }, [pathname, hash, state, navType]);

  return null;
}

function AppContent() {

  return (
    <main className="bg-black text-white min-h-screen transition-colors duration-300 relative">
      <Preloader />
      
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] bg-secondary/20 rounded-full blur-[100px]" />
      </div>

      <LiquidGlassCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToAnchor />
        <AppContent />
        <Analytics />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
