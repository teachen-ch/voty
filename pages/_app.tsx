import "../styles/chota.css";
import "../styles/voty.css";
import Menu from "components/Menu";
import { Footer } from "components/Footer";
import { Header } from "components/Header";

import { MDXProvider } from "@mdx-js/react";
import theme from "styles/theme";
import { ThemeProvider } from "theme-ui";

import Page from "components/Page";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Header />
      <Menu />
      <ThemeProvider theme={theme}>
        <MDXProvider components={{ wrapper: MDXWrapper }}>
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

const MDXWrapper = (props: any) => <Page>{props.children}</Page>;

export default MyApp;
