import React from 'react';
import { css } from 'linaria';

import "@fontsource/roboto-condensed/300.css";
import "@fontsource/roboto-condensed/300-italic.css";
import "@fontsource/roboto-condensed/400.css";
import "@fontsource/roboto-condensed/700.css";

export const globals = css`
  :global() {
    :root {
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
      font-size: 20px;
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
    }
  }
`;

export const Layout: React.FC = ({ children }) => (
  <>
    {children}
  </>
)