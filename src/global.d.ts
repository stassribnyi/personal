
declare namespace Glide {
    interface Static {
        new(selector: HTMLDivElement, options?: Options): Static;
    }
}

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