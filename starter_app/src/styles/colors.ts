type ColorKey =
  | "c100"
  | "c98"
  | "c95"
  | "c90"
  | "c80"
  | "c70"
  | "c60"
  | "c50"
  | "c40"
  | "c30"
  | "c20"
  | "c10"
  | "c0";

type ColorType = Record<ColorKey, string>;

export const primary: ColorType = {
  c100: "#FFF",
  c98: "#FBF8FF",
  c95: "#F0EFFF",
  c90: "#DEE0FF",
  c80: "#BAC3FF",
  c70: "#96A5FF",
  c60: "#7187FF",
  c50: "#546CE7",
  c40: "#3952CD",
  c30: "#1937B4",
  c20: "#00208E",
  c10: "#00115A",
  c0: "#000",
};

export const secondary: ColorType = {
  c100: "#FFF",
  c98: "#FFF8F6",
  c95: "#FFEDE9",
  c90: "#FFDBD2",
  c80: "#FFB4A2",
  c70: "#FF8B6D",
  c60: "#FF562A",
  c50: "#DB3C0E",
  c40: "#B32A00",
  c30: "#891E00",
  c20: "#611200",
  c10: "#3C0800",
  c0: "#000",
};

export const tertiary: ColorType = {
  c100: "#FFF",
  c98: "#FFF9EA",
  c95: "#FFF2AC",
  c90: "#F5E47F",
  c80: "#D8C866",
  c70: "#BBAC4E",
  c60: "#A09236",
  c50: "#85781E",
  c40: "#6B5F00",
  c30: "#504700",
  c20: "#373100",
  c10: "#201C00",
  c0: "#000",
};

export const error: ColorType = {
  c100: "#FFF",
  c98: "#FFF8F7",
  c95: "#FFEDEA",
  c90: "#FFDAD5",
  c80: "#FFB4AB",
  c70: "#FF897D",
  c60: "#FF5449",
  c50: "#DE372F",
  c40: "#BA1A1A",
  c30: "#930009",
  c20: "#690004",
  c10: "#410002",
  c0: "#000",
};

export const neutral: ColorType = {
  c100: "#FFF",
  c98: "#FDF8F8",
  c95: "#F4F0EF",
  c90: "#E5E2E1",
  c80: "#C9C6C5",
  c70: "#ADAAAA",
  c60: "#939090",
  c50: "#797676",
  c40: "#605E5E",
  c30: "#484646",
  c20: "#313030",
  c10: "#1C1B1B",
  c0: "#000",
};

export const neutralVariant: ColorType = {
  c100: "#FFF",
  c98: "#FCF8F9",
  c95: "#F3F0F1",
  c90: "#E5E2E2",
  c80: "#C9C6C6",
  c70: "#ADAAAB",
  c60: "#929091",
  c50: "#787677",
  c40: "#5F5E5F",
  c30: "#474647",
  c20: "#313031",
  c10: "#1C1B1C",
  c0: "#000",
};
