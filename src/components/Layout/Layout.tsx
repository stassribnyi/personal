import React from 'react'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
  rgbToHex,
  CssBaseline,
  Box,
  GlobalStyles,
} from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'

import '@fontsource/roboto-condensed/300.css'
import '@fontsource/roboto-condensed/300-italic.css'
import '@fontsource/roboto-condensed/400.css'
import '@fontsource/roboto-condensed/700.css'
import type {} from '@mui/lab/themeAugmentation'

const COLORS = {
  common: {
    black: 'rgb(0, 0, 0)',
    white: 'rgb(255, 255, 255)',
    dark: 'rgb(51, 51, 51)',
    light: 'rgb(243, 242, 239)',
  },

  accent: {
    dark: 'rgb(50, 89, 99)',
    light: 'rgb(244, 121, 124)',
  },
} as const

const DEVICE_SIZE = {}

const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: COLORS.common.light,
            border: `0.1em solid ${COLORS.common.light}`,

            boxShadow: `2px 2px 2px rgba(0, 0, 0, 0.4)`, // TODO: reuse
            textShadow: `2px 2px 2px rgba(0, 0, 0, 0.4)`,
          },
        },
        defaultProps: {
          variant: 'contained',
          color: 'primary',
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            alignItems: 'center',
            display: 'flex',
            gap: '0.2em',

            paddingBottom: '0.2em',
            position: 'relative',

            transition: 'color 0.5s',

            '&:after': {
              content: '""',
              width: '100%',
              height: '0.1em',

              left: 0,
              bottom: 0,
              display: 'block',
              position: 'absolute',

              opacity: 0,
              transition: 'opacity 0.5s',

              backgroundColor: 'currentColor',
            },
          },
        },
        variants: [
          {
            props: { color: 'white' },
            style: {
              '&:hover, &:hover': {
                color: COLORS.accent.light,
              },
            },
          },
          {
            props: { underline: 'always' },
            style: {
              textDecoration: 'none',

              '&:after': {
                opacity: 1,
              },
            },
          },
          {
            props: { underline: 'hover' },
            style: {
              '&:hover': {
                textDecoration: 'none',

                '&:after': {
                  opacity: 1,
                },
              },
            },
          },
        ],
        defaultProps: {
          variant: 'body1',
          color: 'white',
          underline: 'hover',
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: COLORS.common.white,
            boxShadow: `2px 2px 2px rgba(0, 0, 0, 0.4)`,
          },
        },
        defaultProps: {
          color: 'secondary',
          focused: true,
          size: 'small',
          margin: 'dense',
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.MuiTypography-gutterBottom': {
              marginBottom: '1.25em',
            },
          },
        },
        variants: [
          {
            props: { variant: 'h1' },
            style: {
              position: 'relative',

              '&::after': {
                content: '""',
                display: 'flex',

                height: '0.525rem',
                minWidth: '5em',
                margin: '0.25em auto 0 auto',

                backgroundColor: COLORS.accent.light,
              },
            },
          },
          {
            props: { variant: 'h2' },
            style: {
              position: 'relative',

              '&::after': {
                content: '""',
                display: 'flex',

                height: '0.1em',
                minWidth: '5em',
                margin: '0.25em auto 0 auto',

                backgroundColor: COLORS.accent.light,
              },
            },
          },
          {
            props: { variant: 'h3' },
            style: {
              position: 'relative',

              '&::after': {
                content: '""',
                display: 'flex',

                height: '0.05em',
                minWidth: '120%',
                marginTop: '0.1em',
                marginLeft: '-10%',

                backgroundColor: COLORS.accent.light,
              },
            },
          },
        ],
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: COLORS.common.dark,
          },
        },
        defaultProps: {
          showLabels: true,
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            color: COLORS.common.light,
            '&.Mui-selected': {
              color: COLORS.accent.light,
            },
          },
        },
      },
      MuiTimelineConnector: {
        styleOverrides: {
          root: {
            width: 4,
          },
        },
      },
      MuiTimelineOppositeContent: {
        styleOverrides: {
          root: {
            flex: 0.35,
          },
        },
      },
      MuiTimelineDot: {
        styleOverrides: {
          root: {
            width: 24,
            height: 24,
            borderWidth: 4,
          },
        },
        variants: [
          {
            props: { variant: 'filled' },
            style: {
              boxShadow: 'none',
              position: 'relative',
              backgroundColor: 'transparent',
              borderColor: COLORS.accent.light,

              '&::after': {
                width: 8,
                height: 8,
                borderRadius: '50%',

                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',

                content: '""',
                display: 'flex',
                position: 'absolute',

                backgroundColor: COLORS.accent.light,
              },
            },
          },
        ],
      },
      MuiSvgIcon: {
        variants: [
          {
            props: { fontSize: 'medium' },
            style: {
              fontSize: '2.25rem',
            },
          },
        ],
      },
    },
    palette: {
      primary: {
        main: COLORS.accent.light,
      },
      secondary: {
        main: COLORS.accent.dark,
      },
      common: {
        black: COLORS.common.dark,
        white: COLORS.common.white,
        dark: COLORS.common.dark,
        light: COLORS.common.light,
      },
    },
    shape: {
      borderRadius: 0,
    },
    typography: {
      fontSize: 20,
      fontFamily: [
        '"Roboto Condensed"',
        '-apple-system',
        'system-ui',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
  })
)

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles
      styles={{
        html: {
          scrollBehavior: 'smooth',
        },

        '@keyframes chevronUpDown': {
          from: {
            transform: 'translateY(-25%)',
          },

          to: {
            transform: 'translateY(0)',
          },
        },
      }}
    />
    <Router>
      <Box sx={{ position: 'relative' }}>{children}</Box>
    </Router>
  </MuiThemeProvider>
)
