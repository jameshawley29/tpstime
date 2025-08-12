import React, { useEffect } from "react";
import { createRoot } from "react-dom/client"; // React 18 entry point
import "./index.css";
import "./styles/themes.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
// ...existing code...
import { ThemeProvider } from "./contexts/ThemeContext";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
// ...existing code...

const container = document.getElementById("root");
if (!container) throw new Error("#root not found");

const root = createRoot(container); // React 18 way

const ALLOWED_DOMAIN = "trinityprep.org"; // NEW

function AppWithAuth() {
  // Directly render the app, no authentication required
  return <App />;
}

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AppWithAuth />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
