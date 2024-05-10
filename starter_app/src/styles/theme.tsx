import { createTheme } from "@mui/material/styles";
import { lightModePalette, darkModePalette} from "./palette";

export const getTheme = (mode: 'light' | 'dark',) => createTheme({
    palette: {
        mode, 
        ...(mode === "light" ? lightModePalette : darkModePalette),
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 16,
      h1: {
        fontSize: "2.986rem",
      },
      h2: {
        fontSize: "2.488rem",
      },
      h3: {
        fontSize: "2.074rem",
      },
      h4: {
        fontSize: "1.728rem",
      },
      h5: {
        fontSize: "1.44rem",
      },
      h6: {
        fontSize: "1.2rem",
      },
      paragraphLarge: {
        fontSize: '18px',
      },
      paragraphMedium: {
        fontSize: '16px',
      },
      paragraphSmall: {
        fontSize: '14px',
      },
      paragraphXSmall: {
        fontSize: '14px',
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 100,
            textTransform: "none",
            boxShadow: "none",
            padding: "6px 10px",
          },
          contained: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              background: `linear-gradient(
                0deg, 
                ${theme.palette.primary.conOpacity1}, 
                ${theme.palette.primary.conOpacity1}
                ), ${theme.palette.primary.main}`,
                boxShadow: `
                0px 1px 2px rgb(0, 0, 0, .3),
                0px 1px 3px 1px rgb(0, 0, 0, .15)}
              `,
              '&:active': {
                background: `linear-gradient( 
                  0deg,
                  ${theme.palette.primary.conOpacity2}, 
                  ${theme.palette.primary.conOpacity2}
                  ), ${theme.palette.primary.main}`,
                  boxShadow: "none !important", 
              },
            },
            '&:focus': {
              background: `linear-gradient( 
                0deg,
                ${theme.palette.primary.conOpacity2}, 
                ${theme.palette.primary.conOpacity2}
                ), ${theme.palette.primary.main}`,
                boxShadow: "none !important", 
            },
          }),
          outlined: ({ theme }) => ({
            border: `1px solid ${theme.palette.primary.main}`,
              color: `${theme.palette.primary.main}`,
              '&:hover': {
                background: `linear-gradient(
              0deg, 
              ${theme.palette.primary.mainOpacity1}, 
              ${theme.palette.primary.mainOpacity1}
              )`,
                '&:active': {
                  background: `linear-gradient(
                    0deg, 
                    ${theme.palette.primary.mainOpacity2}, 
                    ${theme.palette.primary.mainOpacity2}
                  )`,
                },
              },
              '&:focus': {
                background: `linear-gradient(
                  0deg, 
                  ${theme.palette.primary.mainOpacity2}, 
                  ${theme.palette.primary.mainOpacity2}
                )`,
              }
          }),
          text: ({ theme }) => ({
            color: `${theme.palette.primary.main}`,
              '&:hover': {
                background: `linear-gradient(
              0deg, 
              ${theme.palette.primary.mainOpacity1}, 
              ${theme.palette.primary.mainOpacity1}
              )`,
                '&:active': {
                  background: `linear-gradient(
                    0deg, 
                    ${theme.palette.primary.mainOpacity2}, 
                    ${theme.palette.primary.mainOpacity2}
                  )`,
                },
              },  
              '&:focus': {
                background: `linear-gradient(
                  0deg, 
                  ${theme.palette.primary.mainOpacity2}, 
                  ${theme.palette.primary.mainOpacity2}
                )`,
              }
          }),
        },
      },
    },
  });