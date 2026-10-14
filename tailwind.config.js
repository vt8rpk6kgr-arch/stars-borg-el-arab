/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pitch-night': 'var(--pitch-night)',
        'pitch-panel': 'var(--pitch-panel)',
        'pitch-green': 'var(--pitch-green)',
        'neon-phosphor': 'var(--neon-phosphor)',
        'neon-orange': 'var(--neon-orange)',
        'neon-pink': 'var(--neon-pink)',
        'pitch-deep': 'var(--pitch-deep)',
        'sun-yellow': 'var(--sun-yellow)',
        'card-red': 'var(--card-red)',
        'sky-cyan': 'var(--sky-cyan)',
        'paper-cream': 'var(--paper-cream)',
        'ink': 'var(--ink)',
        'line': 'var(--line)',
      },
      fontFamily: {
        display: ['Lalezar', 'Cairo', 'sans-serif'],
        body: ['Cairo', 'Tajawal', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      boxShadow: {
        'pixel-sm': 'var(--shadow-x) 2px 0 var(--ink)',
        'pixel': 'var(--shadow-x) 4px 0 var(--ink)',
        'pixel-lg': 'calc(var(--shadow-x) * 1.5) 6px 0 var(--ink)',
        'pixel-yellow': 'var(--shadow-x) 4px 0 var(--sun-yellow)',
        'pixel-green': 'var(--shadow-x) 4px 0 var(--pitch-green)',
        'pixel-orange': 'var(--shadow-x) 4px 0 var(--neon-orange)',
        'pixel-pink': 'var(--shadow-x) 4px 0 var(--neon-pink)',
      },
    },
  },
  plugins: [],
}
