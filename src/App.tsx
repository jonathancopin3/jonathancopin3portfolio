import { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LiquidGlassCursor } from './components/LiquidGlassCursor';
import { Home } from './pages/Home';
import { ProjectDetails } from './pages/ProjectDetails';
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from "@vercel/analytics/react"

// Scroll to top on route change
// Scroll to top or hash on route change
const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // Disable browser's default scroll restoration on initial load
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force immediate scroll to top
    window.scrollTo(0, 0);

    // Double check after a small delay to handle mobile browser oddities
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      // Allow hash scrolling
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        // Force top if on homepage without hash
        window.scrollTo(0, 0);
      }
    } else {
      // For other routes, always top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {

  // Remove preloader
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 500);
    }
  }, []);

  return (
    <main className="bg-black text-white min-h-screen transition-colors duration-300 relative">
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
