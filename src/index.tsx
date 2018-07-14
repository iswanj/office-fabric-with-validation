import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const rootEl = document.getElementById("root") as HTMLElement;

import { initializeIcons } from "@uifabric/icons";

// Register icons and pull the fonts from the default SharePoint cdn:
initializeIcons();

ReactDOM.render(<App />, rootEl);
registerServiceWorker();

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
