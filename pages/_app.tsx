import "chota";
import "../styles/voty.css";
import Menu from "../components/Menu";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
