import { useEffect, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './ThemeContextVal';

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Always force 'dark'
    const theme: Theme = 'dark';

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light');
        root.classList.add('dark');
        // Ensure persistence (optional, but good for consistency if logic reverts later)
        localStorage.setItem('theme', 'dark');
    }, []);

    // Toggle does nothing as we are forced to dark
    const toggleTheme = () => {
        // No-op
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
