/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#030303',
                primary: {
                    light: '#6366f1',
                    DEFAULT: '#4f46e5',
                    dark: '#3730a3',
                },
                accent: {
                    cyan: '#00f3ff',
                    gold: '#d4af37',
                }
            },
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 8s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-20px) scale(1.05)' },
                }
            }
        },
    },
    plugins: [],
}
