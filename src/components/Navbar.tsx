import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { name: 'About Me', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle initial hash scroll when navigating from another page
    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const handleLogoClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (location.pathname === '/') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                const offset = 80; // height of navbar
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-apple py-3' : 'bg-transparent py-5'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={handleLogoClick}
                        className="flex items-center gap-2 relative z-50"
                    >
                        <img
                            src="/Image all projet/Logo/Logo.png"
                            alt="Logo"
                            className="h-[22px] w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={location.pathname === '/' ? link.href : `/${link.href}`}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-xs font-medium text-white/80 hover:text-white transition-colors tracking-wide"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white relative z-50 p-2"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Portal */}
            {createPortal(
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl flex items-center justify-center md:hidden"
                        >
                            <div className="flex flex-col items-center gap-8">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={location.pathname === '/' ? link.href : `/${link.href}`}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="text-2xl font-display font-medium text-white hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};
