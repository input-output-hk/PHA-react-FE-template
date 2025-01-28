//Mui imports
import { PaletteOptions } from "@mui/material";

export const lightModePalette: PaletteOptions = {
  primary: {
    main: "#3952CD",
    mainOpacity1: "rgba(57, 82, 205, 0.08)", 
    mainOpacity2: "rgba(57, 82, 205, 0.12)",
    container: "#DEE0FF", 
    onContainer: "#00115A", 
    conOpacity1: "rgba(222, 224, 255, 0.08)",
    conOpacity2: "rgba(222, 224, 255, 0.12)",
  },
   // primary: {
  //   main: "#6d5e0f", 
  //   mainOpacity1: "rgba(109, 94, 15, 0.08)",
  //   mainOpacity2: "rgba(109, 94, 15, 0.12)",
  //   container: "#f8e287", 
  //   onContainer: "#221b00", 
  //   conOpacity1: "rgba(248, 226, 135, 0.08)",
  //   conOpacity2: "rgba(248, 226, 135, 0.12)",
  // },
  // primary: {
  //   main: "#4c662b", 
  //   mainOpacity1: "rgba(76, 102, 43, 0.08)",
  //   mainOpacity2: "rgba(76, 102, 43, 0.12)",
  //   container: "#cdeda3", 
  //   onContainer: "#102000", 
  //   conOpacity1: "rgba(205, 237, 163, 0.08)",
  //   conOpacity2: "rgba(205, 237, 163, 0.12)",
  // },
  secondary: {
    main: "#B32A00", 
    container: "#FFDBD2",
    onContainer: "#3C0800",
  },
  // secondary: {
  //   main: "#665e40", 
  //   container: "#eee2bc",
  //   onContainer: "#211b04",
  // },
  // secondary: {
  //   main: "#586249", 
  //   container: "#dce7c8",
  //   onContainer: "#151e0b",
  // },
  tertiary: {
    main: "#6B5F00",
    container: "#F5E47F",
    onContainer: "#201C00",
  },
   // tertiary: {
  //   main: "#43664e",
  //   container: "#c5ecce",
  //   onContainer: "#00210f",
  // },
  // tertiary: {
  //   main: "#386663",
  //   container: "#bcece7",
  //   onContainer: "#00201e",
  // },
  error: { 
    main: "#BA1A1A", 
    container: "#FFDAD5",
    onContainer: "#410002",
  },
  success: {
    main: "#39CD6B"
  },
  surfaceDim: { 
    main: "#DAD9E3", 
    },
  surface: { 
    main: "#FDF8F8", 
    },
  surfaceBright: { 
    main: "#FDF8F8", 
    },
  containerLowest: { 
    main: "#FFF", 
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
    main: "#E5E2E1", 
    },
  onSurface: { 
    main: "#1C1B1B", 
    mainOpacity1: "rgba(28, 27, 27, 0.08)",
    mainOpacity2: "rgba(28, 27, 27, 0.12)",
    },
  onVariant: { 
    main: "#474647", 
    },
  // onVariant: { 
  //   main: "#4b4739", 
  //   },
  // onVariant: { 
  //   main: "#44483d", 
  //   },
  outline: { 
    main: "#787677", 
    },
  outlineVariant: { 
  main: "#C9C6C6",
  },
 };
 
 export const darkModePalette: PaletteOptions = {
  primary: {
    main: "#BAC3FF",
    mainOpacity1: "rgba(186, 195, 255, 0.15)",
    mainOpacity2: "rgba(186, 195, 255, 0.30)",
    onMain: "#001F8F",
    container: "#1A37B5",
    conOpacity1: "rgba(0, 16, 91, 0.15)",
    conOpacity2: "rgba(0, 16, 91, 0.30)",
    onContainer: "#DEE0FF",
  },
    // primary: {
  //   main: "#dbc66e",
  //   mainOpacity1: "rgba(219, 198, 110, 0.15)",
  //   mainOpacity2: "rgba(219, 198, 110, 0.30)",
  //   onMain: "#3a3000",
  //   container: "#534600",
  //   conOpacity1: "rgba(83, 70, 0, 0.15)",
  //   conOpacity2: "rgba(83, 70, 0, 0.30)",
  //   onContainer: "#f8e287",
  // },
  // primary: {
  //   main: "#b1d18a",
  //   mainOpacity1: "rgba(117, 209, 138, 0.15)",
  //   mainOpacity2: "rgba(117, 209, 138, 0.30)",
  //   onMain: "#1f3701",
  //   container: "#354e16",
  //   conOpacity1: "rgba(53, 78, 22, 0.15)",
  //   conOpacity2: "rgba(53, 78, 22, 0.30)",
  //   onContainer: "#cdeda3",
  // },
  secondary: {
    main: "#FFB5A0", 
    onMain: "#5F1500",
    container: "#862200",
    onContainer: "#FFDBD1",
  },
  // secondary: {
  //   main: "#d1c6a1", 
  //   onMain: "#363016",
  //   container: "#4e472a",
  //   onContainer: "#eee2bc",
  // },
  // secondary: {
  //   main: "#bfcbad", 
  //   onMain: "#2a331e",
  //   container: "#404a33",
  //   onContainer: "#dce7c8",
  // },
  tertiary: {
    main: "#DBC84E",
    onMain: "#373100",
    container: "#504700",
    onContainer: "#F8E467",
  },
  // tertiary: {
  //   main: "#a9d0b3",
  //   onMain: "#143723",
  //   container: "#2c4e38",
  //   onContainer: "#c5ecce",
  // },
  // tertiary: {
  //   main: "#a0d0cb",
  //   onMain: "#003735",
  //   container: "#1f4e4b",
  //   onContainer: "#bcece7",
  // },
  error: { 
    main: "#FFB4AB", 
    onMain: "#690005",
    container: "#93000A",
    onContainer: "#FFDAD6",
  },
  success: {
    main: "#39CD6B"
  },
  surfaceDim: { 
    main: "#12131A", 
    },
  surface: { 
    main: "#12131A", 
    },
  surfaceBright: { 
    main: "#383941", 
    },
  containerLowest: { 
    main: "#0D0E15", 
    },
  containerLow: { 
    main: "#1A1B23", 
    },
  container: { 
    main: "#1E1F27", 
    },
  containerHigh: { 
    main: "#292931", 
    },
  containerHighest: { 
    main: "#33343C", 
    },
  onSurface: { 
    main: "#E3E1EC", 
    mainOpacity1: "rgba(227, 225, 236, 0.15)",
    mainOpacity2: "rgba(227, 225, 236, 0.30)",
    },
  onVariant: { 
    main: "#C5C5D6", 
    },
  // onVariant: { 
  //   main: "#cdc6b4", 
  //   },
  // onVariant: { 
  //   main: "#c5c8ba", 
  //   },
  outline: { 
    main: "#8F909F", 
    },
  outlineVariant: { 
    main: "#444654",
    },
 };
