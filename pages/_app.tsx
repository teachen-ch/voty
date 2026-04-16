import "../styles/voty.css";
import "../styles/aula.css";

import { ApolloProvider } from "@apollo/client";
import { MDXProvider } from "@mdx-js/react";
import { AppProps } from "next/app";
import apolloGen from "util/apollo";
import { RecoilRoot as RecoilRootBase } from "recoil";
const RecoilRoot = RecoilRootBase as React.FC<
  React.PropsWithChildren<unknown>
>;
import { Header } from "components/Header";
import { Page } from "components/Page";
import { ReactElement, useEffect, useMemo } from "react";
import CheckLogin from "components/CheckLogin";
import initStats from "util/stats";
import remove from "lodash/remove";
import { GlossaryReplace } from "components/Glossary";
import { useRouter } from "next/router";
import { Theme } from "components/Theme";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const router = useRouter();
  useEffect(() => {
    initStats({
      url: "https://stats.teachen.ch",
      siteId: process.env.NEXT_PUBLIC_STATS_ID || 2,
    });
  }, []);
  const apollo = useMemo(() => apolloGen({ locale: router.locale }), [
    router.locale,
  ]);
  return (
    <ApolloProvider client={apollo}>
      <RecoilRoot>
        <Theme>
          <MDXProvider components={{ wrapper: MDXWrapper }}>
            <CheckLogin />
            <Header />
            <Component {...pageProps} />
          </MDXProvider>
        </Theme>
      </RecoilRoot>
    </ApolloProvider>
  );
}

// this will wrap the MDX into a <Page> only if there is a heading (# title)
const MDXWrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  if (children && Array.isArray(children)) {
    let heading = "";
    const headings = children.filter((el: React.ReactNode) => {
      if (el && typeof el === "object" && "type" in el && "props" in el) {
        if (el.type === "h1") {
          if (!heading) heading = String((el as React.ReactElement).props.children);
          return true;
        }
      }
      return false;
    });
    if (headings.length > 0) {
      const childrenCopy = children.slice();
      remove(childrenCopy, headings[0]);
      return <Page heading={heading}>{childrenCopy}</Page>;
    }
  }
  return <GlossaryReplace>{children}</GlossaryReplace>;
};

export default MyApp;
