import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo_light from "../assets/logo-black.png";
import logo_dark from "../assets/logo-white.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";
import Login from "./Login"; // Adjust the path if needed

const Navbar = ({ theme, setTheme }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const menuItems = [
    {
      name: "Home",
    },
    {
      name: "Recipes",
    },
    {
      name: "Favourites",
    },
  ];

  return (
    <div
      className={`navbar ${theme === "dark" ? "navbar-dark" : "navbar-light"}`}
    >
      <Link to="/" className="logo">
        <img
          src={theme === "light" ? logo_light : logo_dark}
          alt="Logo"
          className="logo-img"
        />
        <div className="logo-name">
          Daily<span>Best</span>Recipes
        </div>
      </Link>

      {/* Menu Items */}
      <ul className="flex space-x-6">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:underline underline-offset-[10px] font-medium"
          >
            <Link to={`/${item.name === "Home" ? "" : item.name.toLowerCase()}`}>
              {item.name}
            </Link>

          </li>
        ))}
      </ul>

      {/* Profile Button */}
      <button
        className="profile-button"
        onClick={() => setIsLoginVisible(true)}
        aria-label="Sign in or sign up"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[50px] h-[50px]"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Toggle Button */}
      <img
        onClick={toggle_mode}
        src={theme === "light" ? toggle_light : toggle_dark}
        alt="Toggle Icon"
        className="toggle-icon"
      />

      {/* Login Modal */}
      {isLoginVisible && (
        <Login
          theme={theme}
          onLogin={() => console.log("Logged in")}
          setIsLoginVisible={setIsLoginVisible}
        />
      )}
    </div>
  );
};

export default Navbar;
