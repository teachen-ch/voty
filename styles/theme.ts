// Rebass Theme-UI theme for voty
export default {
  // [ iphone SE / iPhone 6+ / iPad High / Desktop+iPad / Big Screen]
  breakpoints: ["400px", "600px", "1200px", "2000px"],
  fontSizes: [12, 14, 20, 22, 26, 34, 50, 50, 50],
  colors: {
    text: "black",
    background: "white",
    primary: "#d90000",
    secondary: "#206DBB",
    accent: "#d90000",
    highlight: "#dee4e7",
    muted: "#dee4e7",
    lightgray: "#dee4e7",
    silver: "#A3AFB5",
    gray: "#5a5a5a",
    success: "#258f17",
    green: "#258f17",
  },
  sizes: {
    avatar: 48,
  },
  radii: {
    default: 0,
    square: 0,
    card: 5,
    circle: 1000,
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
    semi: 600,
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
      bg: "silver",
      borderRadius: 0,
    },
    link: {
      color: "inherit",
      textDecoration: "none",
      cursor: "pointer",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: 4,
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
        fontWeight: "semi",
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
      a: {
        color: "inherit",
        ":visited": {
          color: "inherit",
        },
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
      fontWeight: "semi",
      borderRadius: "0px",
      fontSize: 4,
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
    text: {
      variant: "buttons.primary",
      color: "inherit",
      bg: "transparent",
      border: "none",
      textDecoration: "underline",
      cursor: "pointer",
      textAlign: "left",
      fontWeight: "normal",
      fontSize: 3,
      my: 3,
      p: 0,
      m: 0,
    },
    inline: {
      variant: "buttons.primary",
      fontSize: 3,
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
    color: "gray",
    bg: "white",
    border: "none",
    height: 50,
    px: 3,
    my: 1,
    fontSize: [2, 2, 4, 4],
    "::-webkit-input-placeholder": {
      color: "#CCC",
      opacity: 1,
    },
  },
  select: {
    color: "gray",
    bg: "white",
    border: "none",
    height: 50,
    px: 3,
    my: 1,
    fontSize: [2, 2, 4, 4],
    backgroundRepeat: "no-repeat",
    backgroundImage: "url('/images/icon_dropdown.svg')",
    backgroundPosition: "right .7em top 50%, 0 0",
    backgroundSize: "1.5em auto, 100%",
  },
};
