import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        studio: {
          primary: '#7C3AED',
          'primary-dark': '#5B21B6',
          'primary-light': '#EDE9FE',
          accent: '#F59E0B',
          gray: '#6B7280',
          'gray-light': '#F9FAFB',
          border: '#E5E7EB',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [tailwindScrollbar],
};
