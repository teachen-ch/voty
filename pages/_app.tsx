import "../styles/new.css";

import { ApolloProvider } from "@apollo/client";
import { MDXProvider } from "@mdx-js/react";
import theme from "styles/theme";
import { ThemeProvider } from "theme-ui";
import { AppProps } from "next/app";
import apollo from "util/apollo";
import { RecoilRoot } from "recoil";
import Menu from "components/Menu";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { Page } from "components/Page";
import CheckLogin from "components/CheckLogin";
import { ReactElement } from "react";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <div className="container">
      <ApolloProvider client={apollo}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <MDXProvider components={{ wrapper: MDXWrapper }}>
              <CheckLogin />
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

const MDXWrapper: React.FC = (props) => <Page>{props.children}</Page>;

export default MyApp;
