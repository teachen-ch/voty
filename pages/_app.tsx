import "../styles/chota.css";
import "../styles/voty.css";
import Menu from "../components/Menu";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

import { MDXProvider } from "@mdx-js/react";
import Page from "../components/Page";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Header />
      <Menu />
      <MDXProvider components={{ wrapper: Wrapper }}>
        <Component {...pageProps} />
      </MDXProvider>
      <Footer />
    </div>
  );
}

const Wrapper = (props: any) => <Page>{props.children}</Page>;

export default MyApp;
