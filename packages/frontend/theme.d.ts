// eslint-disable-next-line
import type { AppThemeInterface } from '@/types';

declare module '@mui/material/styles' {
  interface Theme extends AppThemeInterface {}
  interface ThemeOptions extends AppThemeInterface {}

  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: true;
    lg: true;
    xl: false;
  }
  interface TypographyVariants {
    poster: React.CSSProperties;
    copyright: React.CSSProperties;
    inputText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
    copyright?: React.CSSProperties;
    inputText?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
    copyright: true;
    inputText: true;
    subtitle1: true;
    h1: false;
    h2: false;
    h5: false;
    h6: false;
    subtitle2: false;
  }
}
