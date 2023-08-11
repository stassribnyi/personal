import React from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  rgbToHex,
  CssBaseline,
} from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type {} from '@mui/lab/themeAugmentation';

import '@fontsource/roboto-condensed/300.css';
import '@fontsource/roboto-condensed/300-italic.css';
import '@fontsource/roboto-condensed/400.css';
import '@fontsource/roboto-condensed/700.css';

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
} as const;

const DEVICE_SIZE = {};

const THEME = {
  palette: {
    ...COLORS,
  },
  typography: {
    ...COLORS,
  },
};

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.125rem',
          lineHeight: '1.275',
          fontWeight: 400,

          textTransform: 'initial',
          color: COLORS.common.light,
          border: `0.1em solid ${COLORS.common.light}`,

          boxShadow: `2px 2px 2px rgba(0, 0, 0, 0.4)`, // ToDo
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
              minWidth: '10em',
              margin: '0.1em auto 0 auto',

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
    MuiGrid: {
      variants: [
        {
          props: { variant: 'section' },
          style: {
            // container: true,
            component: 'section',
            alignItems: 'center',
            flexDirection: 'column',
            pt: 14.256,
            pb: 14.256,
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
    fontSize: 16,
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
    fontWeightRegular: 300,
    fontWeightBold: 700,

    h2: {
      fontSize: '2em',
      fontWeight: '400',
      lineHeight: '1.45',
      textAlign: 'center',
      marginBottom: '1.25em',
      textTransform: 'uppercase',
    },
    h3: {
      fontSize: '1.5em',
      fontWeight: '300',
      lineHeight: '1.2',
      textAlign: 'center',
      marginBottom: '1.25em',
      textTransform: 'uppercase',
    },
    body1: {
      fontSize: '1.125rem',
      textAlign: 'justify',
      lineHeight: '1.45em',
    },
    body2: {
      fontSize: '0.9em',
      textAlign: 'justify',
      lineHeight: '1.45em',
    },
  },
});

export const GlobalStyle = createGlobalStyle`
html{
 scroll-behavior: smooth;

}
    /* :root {
      --black: 0, 0, 0;
      --white: 255, 255, 255;

      --dark: 51, 51, 51;
      --light: 243, 242, 239;

      --dark-accent: 50, 89, 99;
      --light-accent: 244, 121, 124;

      --color-black: rgb(var(--black, 0, 0, 0));
      --color-white: rgb(var(--white, 255, 255, 255));

      --color-dark: rgb(var(--dark, 51, 51, 51));
      --color-light: rgb(var(--light, 243, 242, 239));

      --color-dark-accent: rgb(var(--dark-accent, 50, 89, 99));
      --color-light-accent: rgb(var(--light-accent, 244, 121, 124));

      --color-active: rgb(40, 150, 130);

      --max-content-width: 1140px;
    }

    *,
    h1,
    h2,
    h3,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html,
    body {
      font-size: 16px;
    }

    body {
      font-size: 18px;
      font-weight: 300;
      color: var(--color-dark, rgb(51, 51, 51));
      font-family: "Roboto Condensed", -apple-system, system-ui, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    input,
    select,
    button,
    textarea {
      border-radius: 0;
      -webkit-appearance: none;
    } */

    @keyframes chevronUpDown {
  from {
    transform: translateY(-25%);
  }

  to {
    transform: translateY(0);
  }
}
`;

export const Layout: React.FC = ({ children }) => (
  <ThemeProvider theme={THEME}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Router>{children}</Router>
    </MuiThemeProvider>
  </ThemeProvider>
);
