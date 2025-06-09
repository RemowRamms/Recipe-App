import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo_light from "../assets/logo-black.png";
import logo_dark from "../assets/logo-white.png";
import Login from "./Login";
import { CircleUserRound, Moon, Sun, Search } from "lucide-react";


import {
  fetchRecipesBySearch,
  transformMealPayloadToMockDataStructure,
} from "../api/fetchRecipes";

const Navbar = ({ theme, setTheme, setNewData }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Recipes", path: "/recipes" },
    { name: "Favourites", path: "/favourites" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      fetchRecipesBySearch(searchQuery).then((data) => {
        console.log(data);
        const transformedData = data.map((meal) =>
          transformMealPayloadToMockDataStructure(meal)
        );
        console.log(transformedData);
        setNewData(transformedData);
      });
    };
    fetchData();
  }, [searchQuery]);

  return (
    <div
      className={`w-full h-[55px] p-[40px] flex items-center justify-between px-[7%] transition duration-200 
        ${
          theme === "dark"
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
        <h1
          className={`text-3xl font-extrabold tracking-tight font-serif ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          Food<span className="text-yellow-400">.</span>
        </h1>
      </Link>

      <ul className="flex space-x-6 text-sm font-semibold uppercase absolute left-1/2 transform -translate-x-1/2">
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

      <div className="flex items-center gap-4">
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden 
          ${isSearchOpen ? "w-64 opacity-100 px-4" : "w-0 opacity-0 px-0"} 
          h-10 flex items-center border border-gray-400 rounded-full
          ${theme === "dark" ? "bg-white/20 border-gray-600" : "bg-white"}`}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search..."
            className="bg-transparent w-full outline-none text-sm text-black dark:text-white placeholder:text-gray-500"
          />
        </div>

        <button
          className="bg-none border-none cursor-pointer text-inherit flex items-center"
          onClick={() => {
            setIsSearchOpen((prev) => !prev);
            navigate("/recipes");
          }}
          aria-label="Search"
        >
          <Search className="w-8 h-8" />
        </button>

        <button
          className="bg-none border-none cursor-pointer text-inherit flex items-center"
          onClick={() => setIsLoginVisible(true)}
          aria-label="Sign in or sign up"
        >
          <CircleUserRound className="w-8 h-8" />
        </button>

        <button
          className="bg-none border-none cursor-pointer text-inherit flex items-center"
          onClick={toggle_mode}
        >
          {theme === "light" ? (
            <Sun className="w-8 h-8" />
          ) : (
            <Moon className="w-8 h-8" />
          )}
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
