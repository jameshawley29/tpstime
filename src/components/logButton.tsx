import React from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/clerk-react";

function LogButton() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <SignOutButton>
        <button className="log-button">Log Out</button>
      </SignOutButton>
    );
  }

  return (
    <SignInButton>
      <button className="log-button">Log In</button>
    </SignInButton>
  );
}

export default LogButton;
