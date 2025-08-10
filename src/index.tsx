import React, { useEffect } from "react";
import { createRoot } from "react-dom/client"; // React 18 entry point
import "./index.css";
import "./styles/themes.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ClerkProvider,
  useAuth,
  RedirectToSignIn,
  useUser, // NEW
  useClerk, // NEW
} from "@clerk/clerk-react";
import { ThemeProvider } from "./contexts/ThemeContext";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) throw new Error("Missing Publishable Key");

const container = document.getElementById("root");
if (!container) throw new Error("#root not found");

const root = createRoot(container); // React 18 way

const ALLOWED_DOMAIN = "trinityprep.org"; // NEW

function AppWithAuth() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser(); // NEW
  const { signOut } = useClerk(); // NEW

  // If they signed in with a non-school email, auto sign them out and send back to sign-in
  useEffect(() => {
    // NEW
    if (isLoaded && isSignedIn) {
      const email = user?.primaryEmailAddress?.emailAddress ?? "";
      if (!email.endsWith(`@${ALLOWED_DOMAIN}`)) {
        // optional: add a query param you can read to show a "use your school email" message
        signOut({ redirectUrl: "/sign-in?domain=required" });
      }
    }
  }, [isLoaded, isSignedIn, user, signOut]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  // If they make it here, they're signed in AND on the allowed domain.
  return <App />;
}

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ThemeProvider>
        <AppWithAuth />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals();
