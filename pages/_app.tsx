import "../styles/voty.css";

import { ApolloProvider } from "@apollo/client";
import { MDXProvider } from "@mdx-js/react";
import theme from "styles/theme";
import { ThemeProvider } from "theme-ui";
import { AppProps } from "next/app";
import apollo from "util/apollo";
import { RecoilRoot } from "recoil";
import { Header } from "components/Header";
import { Page } from "components/Page";
import { ReactElement, useEffect } from "react";
import CheckLogin from "components/CheckLogin";
// eslint-disable-next-line
const stats = require("@socialgouv/matomo-next");

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  useEffect(() => {
    // eslint-disable-next-line
    stats.init({ url: "https://stats.teachen.ch", siteId: 2 });
  }, []);
  return (
    <div className="container">
      <ApolloProvider client={apollo}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <MDXProvider components={{ wrapper: MDXWrapper }}>
              <Header />
              <Component {...pageProps} />
            </MDXProvider>
          </ThemeProvider>
        </RecoilRoot>
      </ApolloProvider>
    </div>
  );
}

const MDXWrapper: React.FC = (props) => <Page>{props.children}</Page>;

export default MyApp;
