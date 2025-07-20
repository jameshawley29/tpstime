import React from "react";
import { createRoot } from "react-dom/client"; // React 18 entry point
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ClerkProvider,
  useAuth,
  RedirectToSignIn,
} from "@clerk/clerk-react";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) throw new Error("Missing Publishable Key");

const container = document.getElementById("root");
if (!container) throw new Error("#root not found");

const root = createRoot(container); // React 18 way

function AppWithAuth() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-purple-600 dark:text-stone-50">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (isSignedIn) {
    return <App />;
  }

  return <RedirectToSignIn />;
}

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AppWithAuth />
    </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals();
