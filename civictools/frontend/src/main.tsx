import "./i18n";
import "./index.css";
import { render } from "preact";
import { App } from "./App";
import { applyTheme } from "./tenant";

applyTheme();

render(<App />, document.getElementById("app")!);
