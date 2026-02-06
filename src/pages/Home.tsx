import { Component as LuminaHero } from '../components/ui/lumina-interactive-list';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Contact } from '../components/Contact';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Home = () => {
    return (
        <div className="bg-white dark:bg-dark text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
            <Navbar />
            <LuminaHero />
            <About />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
        </div>
    );
};
