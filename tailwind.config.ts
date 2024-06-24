/* eslint-disable global-require */
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
        modal: '0 0 0.625rem 0 rgba(0, 0, 0, 0.10)',
        button: '0 0 0.5rem 0 rgba(0, 0, 0, 0.08)'
      },
      colors: {
        black: {
          '01': '#2D3136',
          '02': '#3C4352',
          '03': '#697586'
        },
        gray: {
          '01': '#A0AAB8',
          '02': '#DDE2E9',
          '03': '#F5F7FA'
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
        point: '#FF6060',
        block: {
          pink: {
            '01': '#FB2F85',
            '02': '#FFEFF4'
          },
          green: {
            '01': '#55B135',
            '02': '#F1FBED'
          },
          purple: {
            '01': '#9747FF',
            '02': '#F4ECFF'
          },
          orange: {
            '01': '#F35802',
            '02': '#FFF0EA'
          }
        },
        kakao: '#FEE500'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
export default config;
