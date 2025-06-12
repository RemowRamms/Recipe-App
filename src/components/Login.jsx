import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ onLogin, theme, setIsLoginVisible }) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      return;
    }

    try {
      if (isSignUp) {
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        if (existingUsers.find((user) => user.email === email)) {
          setErrorMessage("User already exists. Please login instead.");
          return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);        // Create new user
        const newUser = {
          email,
          displayName: displayName || email.split('@')[0], // Use display name if provided, otherwise use email username
          password: hashedPassword,
          favorites: [],
          ratings: {},
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem(
          "users",
          JSON.stringify([...existingUsers, newUser])
        );
        onLogin(newUser);
      } else {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u) => u.email === email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
          setErrorMessage("Invalid email or password.");
          return;
        }

        onLogin(user);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setErrorMessage("Please enter your email address");
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === resetEmail);

      if (!user) {
        setErrorMessage("No account found with this email address");
        return;
      }

      setResetSuccess(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error in password reset:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage("");
  };

  if (isForgotPassword) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div
          className={`relative z-60 w-full max-w-[360px] rounded-xl p-6 shadow-2xl ring-1 ring-gray-300 dark:ring-gray-600 transition-all
          ${theme === "dark" ? "bg-[#2d2d2d] text-white" : "bg-white text-black"}`}
        >
          <button
            onClick={() => {
              setIsForgotPassword(false);
              setResetSuccess(false);
              setResetEmail("");
              setErrorMessage("");
            }}
            className="absolute top-3 right-4 text-3xl text-gray-400 hover:text-blue-500 transition"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-center mb-6">
            Reset Password
          </h2>

          {resetSuccess ? (
            <div className="text-center">
              <p className="text-green-500 mb-4">
                Password reset instructions have been sent to your email.
              </p>
              <button
                onClick={() => {
                  setIsForgotPassword(false);
                  setResetSuccess(false);
                  setResetEmail("");
                }}
                className="w-full py-3 rounded-md bg-yellow-600 text-white font-semibold text-sm hover:bg-yellow-500 transition"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 rounded-md text-sm border focus:outline-none focus:ring-2 transition
                    ${theme === "dark"
                      ? "bg-[#444] border-[#555] text-white focus:ring-yellow-500"
                      : "bg-gray-100 border-gray-300 text-black focus:ring-yellow-500"}`}
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-md bg-yellow-600 text-white font-semibold text-sm hover:bg-yellow-500 transition"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`relative z-60 w-full max-w-[360px] rounded-xl p-6 shadow-2xl ring-1 ring-gray-300 dark:ring-gray-600 transition-all
        ${theme === "dark" ? "bg-[#2d2d2d] text-white" : "bg-white text-black"}`}
      >
        <button
          onClick={() => setIsLoginVisible(false)}
          className="absolute top-3 right-4 text-3xl text-gray-400 hover:text-blue-500 transition"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-2 rounded-md text-sm border focus:outline-none focus:ring-2 transition
                ${theme === "dark"
                  ? "bg-[#444] border-[#555] text-white focus:ring-yellow-500"
                  : "bg-gray-100 border-gray-300 text-black focus:ring-yellow-500"}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm mb-1">Display Name</label>
              <input
                type="text"
                className={`w-full px-4 py-2 rounded-md text-sm border focus:outline-none focus:ring-2 transition
                  ${theme === "dark"
                    ? "bg-[#444] border-[#555] text-white focus:ring-yellow-500"
                    : "bg-gray-100 border-gray-300 text-black focus:ring-yellow-500"}`}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-2 rounded-md text-sm border focus:outline-none focus:ring-2 transition
                  ${theme === "dark"
                    ? "bg-[#444] border-[#555] text-white focus:ring-yellow-500"
                    : "bg-gray-100 border-gray-300 text-black focus:ring-yellow-500"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-yellow-600 text-white font-semibold text-sm hover:bg-yellow-500 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm space-y-2">
          {!isSignUp && (
            <button
              onClick={() => {
                setIsForgotPassword(true);
                setErrorMessage("");
              }}
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          )}
          <div>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={toggleForm}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
