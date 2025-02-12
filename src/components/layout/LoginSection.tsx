import React, { useState, useEffect } from "react";
import { useSignIn, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginSection: React.FC = () => {
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      navigate("/cart");
    }
  }, [isSignedIn, navigate]);

  const handleLogin = async () => {
    if (!isSignInLoaded) {
      console.error("Clerk not loaded...");
      return;
    }

    setError(null);

    try {
      const signInResponse = await signIn.create({
        identifier: email,
        password: password,
      });

      if (signInResponse.status === "complete") {
        await signIn.setActive({ session: signInResponse.createdSessionId });
        navigate("/profile");
      } else {
        setError("Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Error on login:", error);
      const errorMessage = error?.message
      setError(errorMessage);
    } 
  };

  const handleSocialLogin = async (provider: string) => {
    if (!isSignInLoaded) {
      console.error("Clerk not loaded...");
      return;
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: "http://localhost:5173/sign-in-callback",
        redirectUrlComplete: "/home",
      });
    } catch (error) {
      console.error(`Login error with ${provider}:`, error);
      setError(`Error as  ${provider}.`);
    }
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="flex justify-center">
        <div className="bg-white w-full max-w-md p-8">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300"
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="text-center">
          <button
          onClick={handleLogin}
                  type="button"
                  className="bg-[#B88E2F] hover:bg-yellow-600 text-white font-medium py-2 px-6 w-full"
                >
                  Sign In
                </button>
          </div>
          <p className="text-center mt-4">Don't have an account? Try 
            <Link to="/register" className="text-blue-500 hover:text-blue-700"> Sign Up</Link>
          </p>


          <div className="flex justify-center mt-4 gap-4">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="border border-gray-300 rounded-full p-3 hover:bg-gray-100"
            >
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/google-logo.svg"
                alt="Google"
                className="w-5 h-5"
              />
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("facebook")}
              className="border border-gray-300 rounded-full p-3 hover:bg-gray-100"
            >
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/facebook-logo.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
