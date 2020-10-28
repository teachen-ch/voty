// Rebass Theme-UI theme for voty
export default {
  // [ iphone SE / iPhone 6+ / iPad High / Desktop+iPad / Big Screen]
  breakpoints: ["400px", "600px", "1200px", "2000px"],
  fontSizes: [12, 16, 20, 22, 26, 34, 50, 50, 50],
  colors: {
    text: "#030303",
    black: "#030303",
    background: "white",
    primary: "#d90000",
    secondary: "#206DBB",
    accent: "#d90000",
    highlight: "#dee4e7",
    muted: "#dee4e7",
    lightgray: "#dee4e7",
    silver: ["rgba(163,175,181, 0.25)"],
    silver_m: ["rgba(163,175,181, 0.75)"],
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
    heading: 1.15,
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
      bg: "white",
      color: "black",
      borderRadius: 0,
    },
    link: {
      color: "inherit",
      textDecoration: "none",
      cursor: "pointer",
    },
    underline: {
      textDecoration: "underline",
    },
    centered: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: [2, 2, 4],
      table: {
        borderSpacing: 0,
        width: "100%",
        fontSize: [2, 2, 2],
        textAlign: "left",
        borderBottom: "2px solid white",
      },
      th: {
        px: 2,
        py: 1,
        textAlign: "left",
        borderBottom: "2px solid white",
      },
      tbody: {
        tr: {
          height: "32px",
          ":nth-child(odd)": {
            backgroundColor: "#88969D",
          },
          ":hover": {
            // backgroundColor: "secondary",
            opacity: "0.8",
            cursor: "pointer",
          },
        },
      },
      td: {
        px: 2,
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
        color: "gray",
      },
      a: {
        cursor: "pointer",
        color: "inherit",
        ":visited": {
          color: "inherit",
        },
      },
      label: {
        textAlign: "left",
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
    fielderror: {
      fontSize: 1,
      fontWeight: "semi",
      color: "white",
      bg: "gray",
      marginTop: "-8px",
      p: 1,
      px: 3,
    },
    semi: {
      fontWeight: "semi",
    },
    bold: {
      fontWeight: "bold",
    },
  },
  buttons: {
    primary: {
      fontFamily: "body",
      cursor: "pointer",
      color: "white",
      bg: "secondary",
      fontWeight: "semi",
      borderRadius: "0px",
      fontSize: [2, 3, 4],
      minHeight: "50px",
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
      textAlign: ["center", "center", "left"],
      width: ["100%", "100%", "auto"],
      fontWeight: "normal",
      fontSize: [2, 2, 3],
      my: 3,
      p: 0,
      m: 0,
      ":disabled": {
        textDecoration: "none",
        cursor: "inherit",
        bg: "transparent",
        color: "inherit",
      },
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
  label: { textAlign: "left" },
  textarea: {
    color: "gray",
  },
  input: {
    fontFamily: "body",
    color: "gray",
    bg: "white",
    border: "none",
    outline: "none",
    px: 3,
    mt: [0, 0, 1],
    mb: [3, 2, 1],
    fontSize: [2, 2, 4, 4],
    "::-webkit-input-placeholder": {
      color: "#CCC",
      opacity: 1,
    },
    ":focus": {
      outline: "none",
    },
  },
  select: {
    fontFamily: "body",
    color: "gray",
    bg: "white",
    border: "none",
    height: 50,
    px: 3,
    mt: [0, 0, 1],
    mb: [3, 2, 1],
    fontSize: [2, 2, 4, 4],
    background: "url('/images/icon_dropdown.svg') 96% / 05% no-repeat #fff",
    ":focus": {
      outline: "none",
    },
  },
};
