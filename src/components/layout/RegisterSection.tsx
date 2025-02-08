import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const RegisterSection: React.FC = () => {
  const { signUp } = useSignUp();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        firstName: firstName,
        lastName: lastName,
        password,
      });

      setIsSuccess(true);
      navigate("/cart");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-black">
          Create Your Account
        </h2>
        <p className="text-base md:text-lg text-gray-500 mt-2 max-w-lg mx-auto">
          Sign up now to enjoy all the features. It's quick and easy!
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white w-full max-w-md p-8 shadow-lg rounded-lg">
          {isSuccess ? (
            <div className="text-center text-green-600">
              <h3 className="text-xl font-semibold">
                Registration Successful!
              </h3>
              <p>Redirecting to your cart...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-black"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-black"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

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
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-black"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="mb-4 text-sm text-red-600">{error}</div>
              )}

              <div className="flex items-center mb-6">
                <input type="checkbox" id="terms" className="mr-2" required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    terms and conditions
                  </a>
                  .
                </label>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg w-full"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
