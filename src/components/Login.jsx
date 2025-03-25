import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file for the styling

const Login = ({ onLogin, theme, setIsLoginVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Track whether to show login or sign up
  const [errorMessage, setErrorMessage] = useState(""); // Error message for form validation
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if email and password are provided
    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      return;
    }

    // Simulate sign-up logic (e.g., save user data, etc.)
    if (isSignUp) {
      console.log("Signing up with:", email, password);
      //  Here you would typically make an API call to register the user.
    } else {
      // Simulate login logic (e.g., check credentials, etc.)
      console.log("Logging in with:", email, password);
      // Here you would typically make an API call to authenticate the user.
    }

    // Call the onLogin function from App to mark the user as logged in
    onLogin();

    // Hide the login modal after successful login
    setIsLoginVisible(false);

    // Redirect to home page after successful login/sign-up
    // navigate("/");
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage(""); // Clear error message when toggling forms
  };

  return (
    <div className="login-modal">
      <div
        className={`login-container ${
          theme === "dark" ? "dark-theme" : "light-theme"
        }`}
      >
        <div className="login-card">
          <button
            className="close-btn"
            onClick={() => setIsLoginVisible(false)}
          >
            &times;
          </button>
          <h2 className="login-title">{isSignUp ? "Sign Up" : "Sign In"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label className="input-label">Email</label>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="input-container">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="submit-btn">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="toggle-form">
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span onClick={toggleForm} className="toggle-form-link">
                {isSignUp ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        className="overlay"
        onClick={() => setIsLoginVisible(false)}
      ></div>{" "}
      {/* Close on overlay click */}
    </div>
  );
};

export default Login;
