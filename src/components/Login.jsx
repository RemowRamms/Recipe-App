import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin, theme, setIsLoginVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      return;
    }

    if (isSignUp) {
      console.log("Signing up with:", email, password);
    } else {
      console.log("Logging in with:", email, password);
    }

    onLogin();
    setIsLoginVisible(false);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`relative z-60 w-full max-w-[320px] rounded-xl p-6 shadow-xl transition-all
          ${theme === "dark" ? "bg-[#2d2d2d] text-white" : "bg-white text-black"}
        `}
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
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-2 rounded-md text-sm border focus:outline-none focus:ring-2 transition
                ${
                  theme === "dark"
                    ? "bg-[#444] border-[#555] text-white focus:ring-blue-500"
                    : "bg-gray-100 border-gray-300 text-black focus:ring-blue-500"
                }
              `}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className={`w-full px-4 py-2 rounded-md text-sm border focus:outline-none focus:ring-2 transition
                ${
                  theme === "dark"
                    ? "bg-[#444] border-[#555] text-white focus:ring-blue-500"
                    : "bg-gray-100 border-gray-300 text-black focus:ring-blue-500"
                }
              `}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
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
  );
};

export default Login;
