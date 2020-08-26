// Rebass Theme-UI theme for voty
export default {
  // [ iphone SE / iPhone 6+ / iPad High / Desktop+iPad / Big Screen]
  breakpoints: ["340px", "400px", "600px", "1200px", "2000px"],
  fontSizes: [11, 13, 17.5, 20, 24, 32, 40, 50],
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
    body: 1.3,
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
      textDecoration: "none",
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
      fontSize: 2,
      backgroundImage: [
        "url(/images/voty_bg_mobile_1.svg)",
        "url(/images/voty_bg_mobile_1.svg)",
        "url(/images/voty_bg_mobile_1.svg)",
        "url(/images/voty_bg_1.svg)",
      ],
      backgroundPosition: "51% 28.5%",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
    },
    h2: {
      variant: "text.heading",
      fontSize: [4, 5],
      mt: 4,
      mb: 2,
      color: "blue",
    },
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      mt: 5,
      mb: 2,
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
      fontWeight: "bold",
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
    full: {
      width: "100%",
      whiteSpace: "nowrap",
      fontWeight: "bold",
    },
  },
  input: {
    bg: "white",
    border: "none",
  },
  select: {
    bg: "white",
    border: "none",
  },
};
