import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      primaryBackgroundDark: colors.slate[700],
      secondaryBackgroundDark: colors.slate[900],
      primaryTextDark: colors.white,
      darkBorder: colors.black,
      
      primaryButtonWhite: colors.white,
      primaryButtonDark: colors.black,

      purpleButton: colors.purple[500],


      primary: colors.black,
      primaryAccent: colors.gray[600],
      secondary: colors.gray[800],
      secondaryAccent: colors.gray[200],
      textPrimary: colors.black,
      textSecondary: colors.white

    },
  },
  plugins: [require("daisyui")],
}
export default config

