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
import initStats from "util/stats";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  useEffect(() => {
    initStats({
      url: "https://stats.teachen.ch",
      siteId: process.env.NEXT_PUBLIC_STATS_ID || 2,
    });
  }, []);
  return (
    <div className="container">
      <ApolloProvider client={apollo}>
        <RecoilRoot>
          {/* @ts-ignore */}
          <ThemeProvider theme={theme}>
            <MDXProvider components={{ wrapper: MDXWrapper }}>
              <CheckLogin />
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
