/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,jsx,ts,tsx,vue}',
    './components/**/*.{js,jsx,ts,tsx,vue}',
    './layouts/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      azul: '#1fb6ff',
      'azul-claro':'#BAE1FF',
      'blue-success':'#a2f9ff',
      'red-errors':'#ff8686',
      'yellow-warnnig':'#fffd83',
      purpura: '#7e5bef',
      rosado: '#ff49db',
      naranaja: '#ff7849',
      verde: '#13ce66',
      blanco: '#f9f9f9',
      amarillo: '#ffc82c',
      'gris-oscuro': '#273444',
      gris: '#8492a6',
      'gris-claro': '#d3dce6',
      'gris-claro-100':'#F9F9F9',
      white:'#FFFFFF'

      
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        none: '0',
        sm: '.125rem',
        DEFAULT: '.25rem',
        lg: '.5rem',
        full: '9999px',
      },
    },
    // Optional suggestion: Add plugins if you're using any
    plugins: [],
  },
};
