
import "@mui/material/styles/createPalette";

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'h3-underlined': true;
    'h4-underlined': true;
  }
}


declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'h3-underlined': true;
    'h4-underlined': true;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    dark: string;
    light: string;
  }
}