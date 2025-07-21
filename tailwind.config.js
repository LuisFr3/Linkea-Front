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
        },
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
          '50%': { borderColor: '#22d3ee' } 
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'typewriter': 'typewriter 2s steps(40, end) forwards',
        'blink': 'blink 0.7s step-end 3',
        'typewriter-blink': 'typewriter 2s steps(40, end) forwards, blink 0.7s step-end 3',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-up-delay': 'fadeInUp 0.6s ease-out forwards 0.4s',
      }      
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
