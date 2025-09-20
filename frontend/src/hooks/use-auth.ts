import { useState } from "react";

export function useAuth() {
  const [isAuthenticated] = useState(false);

  const signOut = async () => {
    // Mock sign out function for portfolio site
    console.log("Sign out clicked");
  };

  return {
    isAuthenticated,
    signOut,
  };
}