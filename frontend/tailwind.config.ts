import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        neon: '#7C3AED'
      },
      boxShadow: {
        glow: '0 0 25px rgba(124,58,237,0.45)'
      }
    }
  },
  plugins: []
};

export default config;
