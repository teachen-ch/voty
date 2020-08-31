import "../styles/new.css";

import { ApolloProvider } from "@apollo/client";
import { MDXProvider } from "@mdx-js/react";
import theme from "styles/theme";
import { ThemeProvider } from "theme-ui";

import apollo from "util/apollo";
import { RecoilRoot } from "recoil";
import Menu from "components/Menu";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { Page } from "components/Page";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <ApolloProvider client={apollo}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <MDXProvider components={{ wrapper: MDXWrapper }}>
              <Header />
              <Menu />
              <Component {...pageProps} />
              <Footer />
            </MDXProvider>
          </ThemeProvider>
        </RecoilRoot>
      </ApolloProvider>
    </div>
  );
}

const MDXWrapper = (props: any) => <Page>{props.children}</Page>;

export default MyApp;
