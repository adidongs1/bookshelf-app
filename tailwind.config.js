/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },

    extend: {
      colors: {
        'mercury': {
          '50': '#f8f8f8',
          DEFAULT: '#e8e8e8',
          '200': '#dcdcdc',
          '300': '#bdbdbd',
          '400': '#989898',
          '500': '#7c7c7c',
          '600': '#656565',
          '700': '#525252',
          '800': '#464646',
          '900': '#3d3d3d',
          '950': '#292929',
        },
        secondary: {
          '50': '#f7f7f8',
          '100': '#efeef0',
          '200': '#dbd9de',
          '300': '#bbb7c2',
          400: '#9590a0',
          DEFAULT: '#706b7c',
          '600': '#625c6d',
          '700': '#504b59',
          '800': '#44414b',
          '900': '#3c3941',
          '950': '#28262b',
        },
        primary: {
          '50': '#ecefff',
          '100': '#dde2ff',
          '200': '#c2caff',
          '300': '#9da7ff',
          '400': '#7678ff',
          DEFAULT: '#6d64fe',
          '600': '#5138f3',
          '700': '#462bd7',
          '800': '#3926ad',
          '900': '#322689',
          '950': '#1e174f',
        },
        'accent': {
          '50': '#f3f4fb',
          '100': '#e5e6f4',
          '200': '#d1d4ec',
          '300': '#b0b7e0',
          '400': '#8b93cf',
          '500': '#6f74c2',
          '600': '#5d5cb4',
          DEFAULT: '#524d9c',
          '800': '#4c4687',
          '900': '#403c6c',
          '950': '#2b2843',
        },



      },

      fontFamily: {
        'sans': ['Outfit', 'sans-serif'],

      },

    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}

