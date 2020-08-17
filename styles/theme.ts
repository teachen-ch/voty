// example theme.js
export default {
  breakpoints: ["40em", "52em", "64em"],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    text: "black",
    background: "white",
    primary: "#d90000",
    secondary: "#8f969b",
    accent: "#d90000",
    highlight: "#dee4e7",
    muted: "#dee4e7",
    lightgray: "#dee4e7",
    gray: "#8f969b",
    success: "#258f17",
    green: "#258f17",
  },
  sizes: {
    avatar: 48,
  },
  radii: {
    default: 4,
    circle: 99999,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    body: '"Source Sans Pro", sans',
    heading: '"Source Sans Pro", sans',
    monospace: 'monaco, "Consolas", "Lucida Console", monospace',
  },
  fontWeights: {
    body: 500,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    card: "0 0 4px rgba(0, 0, 0, .125)",
  },
  variants: {
    avatar: {
      width: "avatar",
      height: "avatar",
      borderRadius: "circle",
    },
    card: {
      p: 3,
      bg: "background",
      borderWidth: 2,
      borderColor: "gray",
      borderStyle: "solid",
    },
    link: {
      color: "primary",
    },
    nav: {
      fontSize: 1,
      fontWeight: "bold",
      display: "inline-block",
      p: 2,
      color: "inherit",
      textDecoration: "none",
      ":hover,:focus,.active": {
        color: "primary",
      },
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    display: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [5, 6, 7],
    },
    caps: {
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
  },
  buttons: {
    primary: {
      color: "white",
      bg: "primary",
    },
    secondary: {
      variant: "buttons.primary",
      color: "background",
      bg: "secondary",
    },
    outline: {
      variant: "buttons.primary",
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 2px",
    },
  },
};
