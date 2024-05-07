import { createTheme } from "@mui/material/styles";
import { primary, secondary, tertiary, error, neutral, neutralVariant} from "./colors";

export type Theme = typeof theme;

export const theme = createTheme({
    palette: {
        primary: {
          main: primary.c40,
          container: primary.c90,
          onContainer: primary.c10,
          fixed: primary.c90,
          fixedDim: primary.c80,
          onFixed: primary.c10,
          onFixedVariant: primary.c30,
        }, 
      secondary: {
        main: secondary.c40, 
        container: secondary.c90,
        onContainer: secondary.c10,
        fixed: secondary.c90,
        fixedDim: secondary.c10,
        onFixed: secondary.c10,
        onFixedVariant: secondary.c30,
        },
      tertiary: {
        main: tertiary.c40,
        container: tertiary.c90,
        onContainer: tertiary.c10,
        fixed: tertiary.c90,
        fixedDim: tertiary.c80,
        onFixed: tertiary.c10,
        onFixedVariant: tertiary.c30,
      },
      error: { 
        main: error.c40, 
        container: error.c90,
        onContainer: error.c10,
        },
      surfaceDim: { 
        main: "#DAD9E3", 
        },
      surface: { 
        main: neutral.c98, 
        },
      surfaceBright: { 
        main: neutral.c98, 
        },
      containerLowest: { 
        main: neutral.c100, 
        },
      containerLow: { 
        main: "#F4F2FD", 
        },
      container: { 
        main: "#EEEDF7", 
        },
      containerHigh: { 
        main: "#E8E7F2", 
        },
      containerHighest: { 
        main: neutral.c90, 
        },
      onSurface: { 
        main: neutral.c10, 
        },
        onVariant: { 
        main: neutralVariant.c30, 
        },
      outline: { 
        main: neutralVariant.c50, 
        },
      outlineVariant: { 
      main: neutralVariant.c80,
      },
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
  });