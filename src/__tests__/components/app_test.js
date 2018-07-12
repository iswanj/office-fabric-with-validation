import React from "react";
import { render, cleanup } from "react-testing-library";

import App from "../../App";

afterEach(cleanup);

describe("App Component Tests", () => {
  it("render App component correctly", () => {
    const { getByText } = render(<App />);
  });
});
