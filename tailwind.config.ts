import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'slideInDown': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'opacity': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'slideInDown': 'slideInDown 0.3s ease-out',
        'opacity': 'opacity 0.4s ease-out',
      },
      colors: {
        primary: {
          DEFAULT: '#FCD535',
          100: '#F0B90B',
          200: '#C99400',
          300:'rgb(240, 185, 11)',
          400:'rgb(201, 148, 0)',
        },
        secondary: {
          DEFAULT: '#2B3139'
        },
        background: {
          DEFAULT: '#181A20',
          200: '#0B0E11',
          300: '#2B3139',
          400: '#5E6673',
          500: '#202630',
          600: '#191A1F',
          700: '#1B1D23',
          800:'rgb(24, 26, 32)',
          900:'rgb(11, 14, 17)',
          1000:'rgba(240,185,11,.1)',
          1100:'rgba(240,185,11,0.1)'
        },
        white: {
          DEFAULT: '#fff',
          100: '#EAECEF',
          200: '#FAFAFA',
          300: '#F5F5F5',
          400: '#D8DCE1',
          500:'#B7BDC6',
          700:'rgb(183, 189, 198)',
          800:'rgb(255, 255, 255)',
          900:'rgb(250, 250, 250)',
          1000:'rgb(112, 122, 138)',
        },
        black: {
          DEFAULT: '#000',
          100: '#1E2329',
          200: '#202630',
          300: '#707A8A',
          400: '#333B47',
          500: '#1E2026',
          600:'#29313d',
          700:'#474D57',
          800:'rgba(0,0,0,.5)',
          900:'rgb(43, 49, 57)',
          1000:'rgb(30, 32, 38)',
          1100:'rgb(30, 35, 41)',
          1200:'rgba(0,0,0,.6)'
        },
        blue: {
          DEFAULT: 'rgb(50, 141, 253)'
        },
        gray: {
          DEFAULT: '#848E9C',
          100: '#B7BDC6',
          200: "#5E6673",
          300: '#474D57',
          400:'#4f5867',
          600:'rgb(94, 102, 115)',
          700:'rgb(71, 77, 87)',
          800:'rgb(234, 236, 239)',
          900:'rgb(132, 142, 156)',
          1000:'rgb(245, 245, 245)'
        },
        green: {
          DEFAULT: '#2ebd85',
          100:'rgb(3, 166, 109)',
          200:'#0ecb81',
        },
        error: {
          DEFAULT: '#F6465D',
          100: '#E33B54',
          background: '#35141D'
        },
        success: {
          DEFAULT: '#0ECB81',
          background: '#102821',
          100: '#2EBD85'
        }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          xl: '1.5rem'
        }
      },
      screens: {
        xs: '575px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1248px',
        xl2:'1200px',
        xl3:'1280px'
      },
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.08) 0px 1px 10px 0px, rgba(0, 0, 0, 0.05) 0px 0px 3px 0px',
      },
      spacing: {
        'custom': 'calc(100% + 4px)',
      },
      backgroundImage: {
        'dark-buy-gradient':'linear-gradient(-90deg, rgb(43, 49, 57) 50%, rgb(24, 26, 32) 0px);',
        'dark-sell-gradient':'linear-gradient(90deg, #2B3139 50%, #181A20 0px)',
        'light-buy-gradient':'linear-gradient(-90deg, #F5F5F5 50%, #FFFFFF 0px);',
        'light-sell-gradient':'linear-gradient(90deg, #F5F5F5 50%, #FFFFFF 0px)',
        'dark-buy-gradient-2':'linear-gradient(180deg, #2B3139 50%, #181A20 0)',
        'light-buy-gradient-2': 'linear-gradient(180deg, #F5F5F5 50%, #FFFFFF 0)'
      },
      rotate: {
        '45': '45deg',
      },
    },
    fontFamily: {
      sans: ['BinancePlex'].concat(defaultTheme.fontFamily.sans),
    },
  },
  plugins: [],
};
export default config;
