/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", 
    "./*.js",
  ],
  theme: {
    extend: {
      // 1. Colores Personalizados (Amarillo Pálido Suave)
      colors: {
        'pale-yellow': '#FFFACD', // Amarillo Pálido (Lemon Chiffon)
        'accent-yellow': '#FFD700', // Un toque de amarillo más fuerte para acentos (Botón CTA)
        'dark-contrast': '#1A1A1A', // Negro profundo para el contraste
      },
      // 2. Animaciones
      keyframes: {
        fadeInDown: {
          'from': { opacity: 0, transform: 'translateY(-20px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInUp: {
          'from': { opacity: 0, transform: 'translateY(20px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseYellow: {
          '0%, 100%': { backgroundColor: '#FFEA00' },
          '50%': { backgroundColor: '#FFFACD' }, // Pulsación entre el pálido y el vibrante
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-yellow': 'pulseYellow 1s infinite',
        'shake': 'shake 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
}