import "../styles/globals.css";
import "../styles/voty.css";
import "../styles/aula.css";

import { ApolloProvider } from "@apollo/client";
import { MDXProvider } from "@mdx-js/react";
import { AppProps } from "next/app";
import apolloGen from "util/apollo";
import { Header } from "components/Header";
import { Page } from "components/Page";
import { ReactElement, useEffect, useMemo, useState, useRef } from "react";
import CheckLogin from "components/CheckLogin";
import initStats from "util/stats";
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
  const isMdx = router.pathname.startsWith("/content");
  return (
    <ApolloProvider client={apollo}>
      <Theme>
        <CheckLogin />
        <Header />
        {isMdx ? (
          <MDXPageWrapper>
            <Component {...pageProps} />
          </MDXPageWrapper>
        ) : (
          <MDXProvider components={{}}>
            <Component {...pageProps} />
          </MDXProvider>
        )}
      </Theme>
    </ApolloProvider>
  );
}

// MDX 3 no longer applies components.wrapper automatically. For /content/* pages
// we capture the first <h1> via a custom MDX component and use its text as the
// page heading, rendering the rest of the MDX inside a <Page> wrapper.
const MDXPageWrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [heading, setHeading] = useState("");
  const captured = useRef(false);
  const components = useMemo(
    () => ({
      h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        if (!captured.current) {
          captured.current = true;
          setHeading(String(props.children ?? ""));
        }
        return null;
      },
    }),
    []
  );
  return (
    <Page heading={heading}>
      <MDXProvider components={components}>
        <GlossaryReplace>{children}</GlossaryReplace>
      </MDXProvider>
    </Page>
  );
};

export default MyApp;
