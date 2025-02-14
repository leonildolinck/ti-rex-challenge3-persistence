import React, { useState, useEffect } from "react";
import { useSignUp, useAuth } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";

const RegisterSection: React.FC = () => {
  const { signUp } = useSignUp();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (isSignedIn) {
      navigate("/cart");
    }
  }, [isSignedIn, navigate]);

  const nameRegex = /^[a-zA-Z]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    if (!nameRegex.test(firstName)) {
      setFirstNameError("must have at least 3 letters");
      isValid = false;
    }

    if (!nameRegex.test(lastName)) {
      setLastNameError("must have at least 3 letters");
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Insert a valid email");
      isValid = false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "at least 8 characters, including uppercase, lowercase, number, and special character"
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (!isValid) return;
    setLoading(true)

    try {
      await signUp.create({
        emailAddress: email,
        firstName: firstName,
        lastName: lastName,
        password,
      });

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setEmailError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}
      <section className="w-full bg-white py-16 relative">
        {isSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
              <button
                onClick={() => {
                  window.location.reload();
                  setTimeout(() => navigate("/cart"), 300);
                }}
                className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold text-black mb-4">
                Thank You for Signing Up!
              </h3>
              <p className="text-gray-700">We're excited to have you on board.</p>
              <p className="text-gray-700">You will be redirected shortly.</p>
            </div>
          </div>
        )}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            Create Your Account
          </h2>
          <p className="text-base md:text-lg text-gray-500 mt-2 max-w-lg mx-auto">
            Sign up now to enjoy all the features. It's quick and easy!
          </p>
        </div>
        <div className="flex justify-center">
          <div className="bg-white w-full max-w-md p-8">
            <form onSubmit={handleRegister} noValidate>
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
                    className="w-full mt-2 p-3 border border-gray-300"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {firstNameError && (
                    <p className="text-[10px] text-red-600 mt-1">
                      {firstNameError}
                    </p>
                  )}
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
                    className="w-full mt-2 p-3 border border-gray-300"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {lastNameError && (
                    <p className="text-[10px] text-red-600 mt-1">
                      {lastNameError}
                    </p>
                  )}
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
                  autoComplete="off"
                  type="text"
                  id="email"
                  placeholder="example@domain.com"
                  className="w-full mt-2 p-3 border border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-[10px] text-red-600 mt-1">{emailError}</p>
                )}
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
                  className="w-full mt-2 p-3 border border-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-[10px] text-red-600 mt-1">{passwordError}</p>
                )}
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
                  className="w-full mt-2 p-3 border border-gray-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPasswordError && (
                  <p className="text-[10px] text-red-600 mt-1">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
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
                  className="bg-[#B88E2F] hover:bg-yellow-600 text-white font-medium py-2 px-6 w-full"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center mt-4">
                Already have an account? Try{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-700">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterSection;
