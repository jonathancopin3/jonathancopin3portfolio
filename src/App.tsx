import { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LiquidGlassCursor } from './components/LiquidGlassCursor';
import { Home } from './pages/Home';
import { ProjectDetails } from './pages/ProjectDetails';
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from "@vercel/analytics/react";
import { Preloader } from './components/Preloader';

// Scroll to top on route change
// Scroll to top or hash on route change
const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // Disable browser's default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      if (hash) {
        // Prioritize anchor hash if present
        const element = document.getElementById(hash.substring(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        // Restore scroll position
        const savedScroll = sessionStorage.getItem('homepageScrollY');
        if (savedScroll !== null) {
          const y = parseInt(savedScroll, 10);
          setTimeout(() => {
            window.scrollTo({ top: y, behavior: 'instant' as any });
          }, 50);
        } else {
          window.scrollTo(0, 0);
        }
      }

      // Track scroll position on homepage
      const handleScroll = () => {
        sessionStorage.setItem('homepageScrollY', window.scrollY.toString());
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // For other pages (like ProjectDetails), always start at top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  // Remove original HTML preloader if it exists
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 500);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
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
    </>
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
