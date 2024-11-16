module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A5D8FF', // Azul pastel
        secondary: '#FFE4B5', // Amarillo claro
        background: '#F0F4F8', // Gris claro
        success: '#C3F3C0', // Verde menta
        warning: '#FFC1B3', // Salmón claro
        neutral: '#000000', // Blanco cálido
      },
    },
  },
  plugins: [],
}
