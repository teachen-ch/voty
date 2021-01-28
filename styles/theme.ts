// Rebass Theme-UI theme for voty
export default {
  // [ iphone SE / iPhone 6+ / iPad High / Desktop+iPad / Big Screen]
  breakpoints: ["400px", "600px", "1200px", "2000px"],
  fontSizes: [12, 16, 20, 22, 26, 34, 50, 50, 50],
  useColorSchemeMediaQuery: false,
  initialColorModeName: "dark",
  colors: {
    background: "white",
    primary: "#206DBB",
    blue2: "#1C88FF",
    blue3: "#0C66C9",
    danger: "#d90000",
    accent: "#d90000",
    highlight: "#dee4e7",
    textarea: "#fff", //"#B1BDC3",
    muted: "#dee4e7",
    lightgray: "#dee4e7",
    darkgray: "rgba(0,0,0,0.2)",
    gray: "#5a5a5a",
    success: "#258f17",
    green: "#258f17",

    // dark mode
    bgcolor: "#313131",
    topbarColor: "#505050",
    panelColor: ["rgba(163,175,181, 0.20)"],
    white: "#fff",
    black: "#030303",
    text: "#030303",
    trColor: "gray",

    modes: {
      light: {
        bgcolor: "white",
        topbarColor: "#dee4e7",
        panelColor: "rgba(193,205,211, 0.50)",
        white: "#030303",
        black: "white",
        text: "white",
        trColor: "gray",
      },
    },
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
    heading: 600,
    bold: 600,
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
      bg: "#fff",
      color: "#000",
      borderRadius: 0,
    },
    link: {
      color: "inherit",
      textDecoration: "none",
      cursor: "pointer",
      ":hover": {
        textDecoration: "underline",
      },
    },
    underline: {
      textDecoration: "underline",
    },
    centered: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    semi: {
      fontWeight: "semi",
    },
    bold: {
      fontWeight: "semi",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: [2, 2, 4],
      color: "white",
      table: {
        borderSpacing: 0,
        width: "100%",
        fontSize: 2,
        textAlign: "left",
        borderBottom: "2px solid",
        borderColor: "white",
      },
      th: {
        px: 2,
        py: 1,
        borderBottom: "2px solid",
        borderColor: "white",
      },
      tbody: {
        tr: {
          height: ["40px", "40px", "40px"],
          ":nth-of-type(odd)": {
            // backgroundColor: "#88969D",
          },
          ":hover": {
            backgroundColor: "primary",
            color: "#fff",
            opacity: "1",
          },
        },
      },
      td: {
        px: [1, 2],
        borderBottom: "1px solid",
        borderColor: "trColor",
      },
      h2: {
        variant: "text.heading",
        fontSize: [3, 4],
        fontWeight: "semi",
      },
      h3: {
        variant: "text.heading",
        fontSize: [2, 2, 4],
        fontWeight: "semi",
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
      hr: {
        borderColor: "currentColor",
        borderTopWidth: "2px",
        borderStyle: "solid",
      },
      img: {
        maxWidth: "100%",
      },
      code: {
        fontSize: "0.7em",
      },
      strong: {
        fontWeight: "semi",
      },
      figcaption: {
        textAlign: "center",
        fontSize: 1,
        fontStyle: "italic",
        mt: 2,
        mb: 3,
        mx: "auto",
        maxWidth: "500px",
      },
    },
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      mt: 4,
      mb: "0.5em",
    },
    panelheading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      color: "blue2",
      mt: 4,
      pb: 1,
      mb: 2,
      borderBottom: "2px solid",
      borderColor: "blue2",
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
      fontWeight: "semi",
    },
    inline: {
      display: "inline-block",
    },
    link: {
      display: "inline-block",
      color: "inherit",
      textDecoration: "none",
      cursor: "pointer",
      ":hover": {
        textDecoration: "underline",
      },
    },
  },
  buttons: {
    primary: {
      fontFamily: "body",
      cursor: "pointer",
      color: "#fff",
      bg: "primary",
      fontWeight: "semi",
      borderRadius: "5px",
      fontSize: [2, 3, 3],
      lineHeight: 1,
      height: "40px",
    },
    secondary: {
      variant: "buttons.primary",
      bg: "darkgray",
    },
    text: {
      variant: "buttons.primary",
      color: "inherit",
      bg: "transparent",
      border: "none",
      textDecoration: "underline",
      cursor: "pointer",
      textAlign: ["left", "left", "left"],
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
    muted: {
      bg: "muted",
      color: "white",
      borderRadius: "0px",
      fontWeight: "semi",
    },
  },
  label: { textAlign: "left", fontSize: [2, 2, 4] },
  textarea: {
    bg: "textarea",
    color: "gray",
    border: "none",
    outline: "none",
    fontSize: [1, 1, 2],
    px: 3,
    mt: [0, 0, 1],
    mb: [3, 2, 1],
    "::placeholder": {
      color: "#ccc",
      opacity: 1,
    },
    ":focus": {
      outline: "none",
    },
  },
  input: {
    fontFamily: "body",
    color: "gray",
    bg: "#fff",
    border: "none",
    outline: "none",
    borderRadius: "5px",
    px: 3,
    height: "40px",
    mt: [0, 0, 1],
    mb: [3, 2, 1],
    fontSize: [3],
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
    height: "40px",
    borderRadius: "5px",
    px: 3,
    mt: [0, 0, 1],
    mb: [3, 2, 1],
    fontSize: [2, 2, 2],
    background: "url('/images/icon_dropdown.svg') 98% / 3%  no-repeat #fff",
    ":focus": {
      outline: "none",
    },
  },
};
