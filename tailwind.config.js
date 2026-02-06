export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "-apple-system", "BlinkMacSystemFont", "San Francisco", "Segoe UI", "Roboto", "Helvetica Neue", "sans-serif"
                ],
                display: [
                    "-apple-system", "BlinkMacSystemFont", "San Francisco", "Helvetica Neue", "sans-serif"
                ],
            },
            colors: {
                primary: {
                    DEFAULT: '#FFFFFF', // White
                    hover: '#E5E5E5',   // Light Gray
                    light: '#A1A1A6',   // Apple Gray
                },
                dark: {
                    DEFAULT: '#000000', // True Black
                    secondary: '#161617', // Apple Dark Gray
                    card: '#1d1d1f', // Slightly lighter gray
                    text: '#f5f5f7', // Off-white
                    muted: '#86868b', // Apple Muted Text
                },
                glass: {
                    DEFAULT: 'rgba(255, 255, 255, 0.05)',
                    border: 'rgba(255, 255, 255, 0.1)',
                },
            },
            animation: {
                'liquid': 'liquid 20s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                liquid: {
                    '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
                    '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
