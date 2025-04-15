
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isAdmin = user?.publicMetadata?.role === "admin";
  
  return {
    user,
    isSignedIn,
    isAdmin,
    signOut: handleSignOut,
  };
};
