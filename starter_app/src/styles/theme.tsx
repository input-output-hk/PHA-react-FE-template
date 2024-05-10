import { createTheme } from "@mui/material/styles";
import { lightModePalette, darkModePalette} from "./palette";

export const getTheme = (mode: 'light' | 'dark') => createTheme({
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
    // components: {
    //   MuiAccordion: {
    //     styleOverrides: {
    //       root: {
    //         borderRadius: `12px !important`,
    //       }
    //     }
    //   },
    //   MuiInputBase: {
    //     styleOverrides: {
    //       root: {
    //         bgcolor: "white",
    //         borderColor: "#6F99FF",
    //         border: 1,
    //         borderRadius: 50,
    //         padding: "8px 16px",
    //         width: "100%",
    //       },
    //     },
    //   },
    //   MuiButton: {
    //     styleOverrides: {
    //       root: {
    //         borderRadius: 50,
    //         textTransform: "none",
    //       },
    //       outlined: (props) => ({
    //         borderColor: props.theme.palette.lightBlue,
    //       }),
    //     },
    //   },
    //   MuiChip: {
    //     variants: [
    //       {
    //         props: { color: "default", variant: "filled" },
    //         style: {
    //           backgroundColor: primaryBlue.c50
    //         },
    //       },
    //       {
    //         props: { color: "success", variant: "filled" },
    //         style: {
    //           backgroundColor: successGreen.c200,
    //           color: successGreen.c700,
    //         },
    //       },
    //       {
    //         props: { color: "error", variant: "filled" },
    //         style: {
    //           backgroundColor: errorRed.c100,
    //           color: errorRed.c500,
    //         },
    //       },
    //       {
    //         props: { color: "warning", variant: "filled" },
    //         style: {
    //           backgroundColor: progressYellow.c200,
    //           color: orange.c700,
    //         },
    //       },
    //       {
    //         props: { color: "info", variant: "filled" },
    //         style: {
    //           backgroundColor: cyan.c100,
    //           color: cyan.c500,
    //         },
    //       },
    //     ],
    //     styleOverrides: {
    //       root: {
    //         fontSize: "0.875rem",
    //         fontWeight: 500,
    //         height: 28,
    //       },
    //       filledPrimary: {
    //         backgroundColor: primaryBlue.c100,
    //         color: primaryBlue.c500,
    //       },
    //       filledSecondary: {
    //         backgroundColor: orange.c100,
    //         color: orange.c600,
    //       },
    //     },
    //   },
    //   MuiPaper: {
    //     styleOverrides: {
    //       root: {
    //         borderRadius: 12,
    //       },
    //     },
    //   },
    //   MuiPopover: {
    //     defaultProps: {
    //       elevation: 2,
    //     }
    //   },
    // },
  });