import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo_light from "../assets/logo-black.png";
import logo_dark from "../assets/logo-white.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";
import Login from "./Login";
import {CircleUserRound, Moon, Sun} from "lucide-react";


const Navbar = ({ theme, setTheme }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const location = useLocation();

  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Recipes", path: "/recipes" },
    { name: "Favourites", path: "/favourites" },
  ];

  return (
    <div
      className={`w-full h-[55px] p-[40px] flex items-center justify-between px-[7%] transition duration-200 
        ${theme === "dark"
          ? "bg-black text-white"
          : "bg-white text-gray-900 shadow-md"
        }`}
    >
      <Link to="/" className="flex items-center gap-3">
        <img
          src={theme === "light" ? logo_light : logo_dark}
          alt="Logo"
          className="h-10 w-auto"
        />
        <h1 className={`text-3xl font-extrabold tracking-tight font-serif ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          Food<span className="text-yellow-400">.</span>
        </h1>
      </Link>

      
      <div className="flex items-center gap-6">
        {/* Menu */}
        <ul className="flex space-x-6 text-sm font-semibold uppercase">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`
                    relative transition-colors duration-300 
                    hover:text-yellow-500 
                    after:absolute after:left-0 after:-bottom-1 after:h-[3px] 
                    after:bg-yellow-400 after:transition-all after:duration-300 
                    after:w-0 hover:after:w-full 
                    ${isActive ? "after:w-full text-yellow-500" : "text-inherit"}
                  `}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className="bg-none border-none cursor-pointer text-inherit flex items-center"
          onClick={() => setIsLoginVisible(true)}
          aria-label="Sign in or sign up"
        >
          <CircleUserRound className="w-8 h-8" />
          
        </button>

      
        <button 
        className="bg-none border-none cursor-pointer text-inherit flex items-center"
        onClick={toggle_mode}>
          {theme === "light" ? <Sun className="w-8 h-8" /> : <Moon className="w-8 h-8" />}
        
        </button>
      </div>

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
