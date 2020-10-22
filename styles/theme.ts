// Rebass Theme-UI theme for voty
export default {
  // [ iphone SE / iPhone 6+ / iPad High / Desktop+iPad / Big Screen]
  breakpoints: ["400px", "600px", "1200px", "2000px"],
  fontSizes: [12, 13, 17.5, 20, 24, 32, 40, 50],
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
    default: 0,
    square: 0,
    circle: 99999,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    body:
      '"Source Sans Pro", -apple-system, "Helvetica Neue", BlinkMacSystemFont, Roboto, sans-serif;',
    heading:
      '"Source Sans Pro",  -apple-system, "Helvetica Neue", BlinkMacSystemFont, Roboto, sans-serif;',
    monospace: 'monaco, "Consolas", "Lucida Console", monospace',
  },
  fontWeights: {
    body: 400,
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
      my: 3,
      bg: "rgba(0,0,0,0.1)",
      borderWidth: 0,
      borderColor: "lightgray",
      borderStyle: "solid",
      borderRadius: 0,
    },
    link: {
      color: "primary",
      textDecoration: "none",
      cursor: "pointer",
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
      ":before": {
        content: '""',
        display: "block",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: "-10",
        backgroundImage: [
          "url(/images/voty_bg_mobile_1.svg)",
          "url(/images/voty_bg_mobile_1.svg)",
          "url(/images/voty_bg_1.svg)",
        ],
        backgroundRepeat: "no-repeat",
        backgroundPosition: ["50% -5%", "50% -10%", "51% 28.5%"],
        opacity: "0.4",
      },
      table: {
        width: "100%",
      },
      th: {
        textAlign: "left",
      },
      td: {
        py: 2,
      },
      h2: {
        variant: "text.heading",
        fontSize: [3, 4],
      },
      h3: {
        variant: "text.heading",
        fontSize: [2, 3],
      },
      h4: {
        variant: "text.heading",
        fontSize: [1, 2],
      },
      "button:disabled": {
        cursor: "inherit",
        bg: "muted",
        color: "white",
      },
    },
    img: {
      maxWidth: "100%",
    },
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      mt: "2em",
      mb: "0.5em",
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
      cursor: "pointer",
      color: "white",
      bg: "primary",
      fontWeight: "bold",
      borderRadius: "0px",
    },
    secondary: {
      variant: "buttons.primary",
      color: "background",
      bg: "secondary",
      borderRadius: "0px",
      cursor: "pointer",
    },
    white: {
      variant: "buttons.primary",
      color: "primary",
      bg: "rgba(255,255,255,0.5)",
      borderRadius: "0px",
      borderWidth: "3px",
      cursor: "pointer",
    },
    outline: {
      variant: "buttons.primary",
      color: "primary",
      bg: "white",
      cursor: "pointer",
    },
    inline: {
      variant: "buttons.primary",
      fontSize: 1,
      color: "white",
      bg: "primary",
      cursor: "pointer",
      p: 1,
      px: 3,
      borderRadius: 0,
      mx: 2,
    },
    full: {
      width: "100%",
      whiteSpace: "nowrap",
      fontWeight: "bold",
      borderRadius: "0px",
      cursor: "pointer",
    },
    muted: {
      bg: "muted",
      color: "white",
      borderRadius: "0px",
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
