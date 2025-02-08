import React from "react";
import { useEffect } from "react";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (!clerk.loaded) {
          console.log("Clerk ainda não carregou...");
          return;
        }

        console.log("Processando callback...");

        await clerk.handleRedirectCallback();

        if (isSignedIn) {
          console.log("Usuário autenticado com sucesso!");
          navigate("/profile");
        } else {
          console.log("Usuário não autenticado. Redirecionando para login.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Erro no callback:", error);
        navigate("/login");
      }
    };

    handleCallback();
  }, [clerk, isSignedIn, navigate]);

  if (isSignedIn) {
    navigate("/profile");
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      <p className="ml-4 text-gray-600">Processando login...</p>
    </div>
  );
};

export default AuthCallback;
