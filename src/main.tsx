import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import App from "./App";
import "./main.css";

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="max-w-lg mx-auto">
      <GlobalStyle />
      <App />
    </div>
  </React.StrictMode>
);
