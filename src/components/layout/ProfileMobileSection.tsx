import React from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";

const ProfileMobileSection: React.FC = () => {
  const { user } = useUser();

  const email = user.emailAddresses?.[0]?.emailAddress || "Not available";
  const formattedSignUp = new Date(user.createdAt).toLocaleDateString();
  const formattedLastSignIn = new Date(user.lastSignInAt).toLocaleDateString();

  return (
      <div className="flex justify-center">
        <div className="flex flex-col bg-white w-[417px] min-h-[746px] justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4 p-8">Profile</h2>
            <hr className="ml-8 mr-20 border-t border-[#D9D9D9]" />
          </div>
          <div className="flex-1 overflow-auto px-8">
            <div className="flex flex-col items-center gap-4 mt-4">
              <img
                src={user.imageUrl}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full border border-gray-300"
              />
              <h3 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-600">{email}</p>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-700">Member since:</span>
                <span className="font-medium">{formattedSignUp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Last Sign In:</span>
                <span className="font-medium">{formattedLastSignIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Orders:</span>
                <span className="font-medium">25</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col min-h-[84px] items-center justify-center border-t border-[#D9D9D9] mt-4">
            <div className="flex flex-row text-[12px] gap-4">
              <SignOutButton>
                <button className="flex border border-[#000000] rounded-[50px] h-[30px] items-center justify-center px-6">
                  Logout
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfileMobileSection;
