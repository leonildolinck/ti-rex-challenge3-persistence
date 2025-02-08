import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const ProtectedLayout: React.FC = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/login", { state: { from: location.pathname }, replace: true });
    }
  }, [isSignedIn, navigate, location]);

  if (!isSignedIn) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedLayout;
