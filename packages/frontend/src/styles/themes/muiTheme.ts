import { createTheme } from '@mui/material';

import { customColors } from '@/configs';
import type { AppThemeInterface } from '@/types';

const inputTextTypography: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 500,
};

const appCustomTheme: AppThemeInterface['app'] = {
  color: customColors,
};

export default createTheme({
  app: appCustomTheme,
  breakpoints: {
    values: {
      md: 1280,
      lg: 1366,
    },
  },

  palette: {
    primary: {
      main: appCustomTheme.color.brightBlue as string,
      light: appCustomTheme.color.daySkyBlue as string,
      contrastText: appCustomTheme.color.white as string,
    },
    success: {
      main: appCustomTheme.color.treeGreen as string,
      contrastText: appCustomTheme.color.white as string,
    },
    warning: {
      main: appCustomTheme.color.dirtyOrange as string,
      contrastText: appCustomTheme.color.white as string,
    },
    error: {
      main: appCustomTheme.color.scarletRed as string,
      contrastText: appCustomTheme.color.white as string,
    },
    secondary: {
      main: appCustomTheme.color.blackEel as string,
      contrastText: appCustomTheme.color.white as string,
    },
  },
  typography: {
    fontFamily: 'Roboto',
    htmlFontSize: 12,
    allVariants: {
      color: appCustomTheme.color.blackEel,
      lineHeight: '23px',
      letterSpacing: '0.5px',
    },
    poster: {
      fontSize: '64px',
      fontWeight: 900,
      lineHeight: '1.6',
    },
    h3: {
      fontSize: '28px',
      fontWeight: 400,
      lineHeight: '1.4',
    },
    h4: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '1.4',
    },
    inputText: inputTextTypography,
    button: {
      fontSize: '16px',
      fontWeight: 700,
      textTransform: 'inherit',
    },
    subtitle1: {
      fontSize: '20px',
      fontWeight: 400,
    },
    copyright: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '1.4',
    },

    body1: {
      fontSize: '12px',
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { size: 'large' },
          style: {
            height: '40px',
            padding: '6px 16px',
          },
        },
        {
          props: { size: 'medium' },
          style: {
            height: '40px',
            padding: '4px 12px',
            fontSize: '14px',
            fontWeight: 700,
          },
        },
        {
          props: { size: 'small' },
          style: {
            height: '30px',
            padding: '4px 10px',
            fontWeight: 500,
            fontSize: '14px',
          },
        },
      ],
      defaultProps: {
        fullWidth: true,
        size: 'large',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '4px',
          ':hover': {
            borderColor: theme.app.color.lightGrey,
          },
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: appCustomTheme.color.blackEel,
        },
        input: {
          fontSize: '22px',
          padding: '4px 0px',
        },
        inputSizeSmall: {
          fontSize: '16px',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        InputLabelProps: {
          shrink: false,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {},
      styleOverrides: {
        root: {
          padding: '0px 6px',
          '& .MuiSvgIcon-root': {
            fontSize: '24px',
          },
        },
      },
    },

    MuiFormControlLabel: {
      defaultProps: {},
      styleOverrides: {
        label: {
          fontSize: '16px',
        },
      },
    },

    MuiList: {
      defaultProps: {},
      styleOverrides: {
        root: {
          scrollbarWidth: 'thin',
          '& .MuiMenuItem-root': {
            fontSize: '16px',
          },
        },
      },
    },

    MuiChip: {
      defaultProps: {},
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },

    MuiFormHelperText: {
      defaultProps: {},
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
  },
});
