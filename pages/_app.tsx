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
import { remove } from "lodash";

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

// this will wrap the MDX into a <Page> only if there is a heading (# title)
const MDXWrapper: React.FC = ({ children }) => {
  if (children && Array.isArray(children)) {
    let heading = "";
    const headings = children.filter((el: React.ReactNode) => {
      if (el && typeof el === "object" && "props" in el) {
        if (!heading) heading = String(el.props.children);
        return el.props.mdxType === "h1";
      } else return false;
    });
    if (headings.length > 0) {
      const childrenCopy = children.slice();
      remove(childrenCopy, headings[0]);
      return <Page heading={heading}>{childrenCopy}</Page>;
    }
  }
  return <>{children}</>;
};

export default MyApp;
