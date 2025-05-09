import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const ProfileCallBack = () => {
  const { isSignedIn, user, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      console.log(user);
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return <div>Carregando...</div>;
  }

  if (!isSignedIn || !user) {
    return <div>Usuário não autenticado.</div>;
  }

  return (
    <div>
      <h1>Bem-vindo, {user.firstName}!</h1>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
};

export default ProfileCallBack;
