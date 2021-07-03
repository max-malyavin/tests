import { render } from "react-dom";

import { App } from "./App";
import { makeServer } from "./mirage/server";

if (window.Cypress) {
  makeServer();
}

render(<App />, document.getElementById("root"));
