/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home" : "url('/redes.svg')"
      },
      backgroundSize: {
        "home-xl" : "50%"
      },
      // Agregar animación (en el login y register)
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards'
      }      
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
