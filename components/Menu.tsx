import { slide as Hamburger } from "react-burger-menu";
import { ReactElement } from "react";

export default function Menu(): ReactElement {
  return (
    <Hamburger right>
      <a id="home" className="menu-item" href="/">
        Start
      </a>
      <hr />
      <a id="about" className="menu-item" href="/impressum">
        Impressum
      </a>
      <a id="about" className="menu-item" href="/datenschutz">
        Datenschutz
      </a>
      <a id="contact" className="menu-item" href="/kontakt">
        Kontakt
      </a>
    </Hamburger>
  );
}

/*var nostyles = {
  bmBurgerButton: {
    position: "absolute",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#c00",
  },
  bmBurgerBarsHover: {
    background: "#000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#fff",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    top: 0,
    left: 0,
  },
  bmMenu: {
    background: "#c00",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#c00",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "block",
    color: "white",
    fontWeight: "bold",
    lineHeight: "2.5em",
    outline: 0,
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
    top: 0,
    left: 0,
  },
};
*/
