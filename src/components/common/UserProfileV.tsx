import React from "react";
import { useUser } from "@clerk/clerk-react";

const UserProfileV = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div></div>;
  }

  return (
    <div>
      <h2>
        Welcome, {user.firstName} {user.lastName}!
      </h2>
    </div>
  );
};

export default UserProfileV;
