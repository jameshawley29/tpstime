import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/themes.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./contexts/ThemeContext";

const container = document.getElementById("root");
if (!container) throw new Error("#root not found");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
