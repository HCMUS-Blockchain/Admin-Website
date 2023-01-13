import { Heebo } from '@next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import type {} from '@mui/x-date-pickers/themeAugmentation'
export const roboto = Heebo({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#EB455F',
    },
    secondary: {
      light: '#EDF7FA',
      main: '#00ABCC',
    },
    error: {
      main: red.A400,
    },
    info: {
      main: '#FFFFFF',
    },
    text: {
      primary: '#000000',
    },
    warning: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
      styleOverrides: {
        maxWidthSm: {
          maxWidth: '680px',
          '@media (min-width: 600px': {
            maxWidth: '680px',
          },
        },
        maxWidthMd: {
          maxWidth: '860px',
          '@media (min-width: 900px': {
            maxWidth: '860px',
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          color: 'black',
          '&:hover': {
            color: '#FF6464',
          },
          '&.active': {
            color: '#FF6464',
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: 'white',
          },
        },
      ],
    },
    MuiListItemButton: {
      // defaultProps: {
      //   selected: true,
      // },
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#9C254D',
            '.MuiListItemIcon-root': {
              color: '#9C254D',
            },
            '&$selected': {
              backgroundColor: 'red',
            },
          },
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        colorPrimary: {
          color: 'primary',
        },
      },
    },
    MuiFormLabel: {
      defaultProps: {
        color: 'warning',
      },
    },
  },
})
