import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      boxShadow: {
        modal: '0 0 0.625rem 0 rgba(0, 0, 0, 0.10)'
      },
      colors: {
        black: {
          '01': '#363636',
          '02': '#505050',
          '03': '#767676'
        },
        gray: {
          '01': '#A8A8A8',
          '02': '#DBDBDB',
          '03': '#F9FAFB'
        },
        white: {
          '01': '#FFFFFF'
        },
        red: {
          '01': '#ED1C24'
        },
        primary: {
          '01': '#4F80FF',
          '02': '#DEEBFF',
          '03': '#F7F9FD'
        },
        secondary: {
          '01': '#F5BA07',
          '02': '#FFF6DC'
        },
        point: '#FF6060'
      }
    }
  },
  plugins: []
};
export default config;
