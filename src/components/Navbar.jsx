import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo_light from "../assets/logo-black.png";
import logo_dark from "../assets/logo-white.png";
import Login from "./Login";
import { CircleUserRound, Moon, Sun, Search, LogOut } from "lucide-react";
import { fetchRecipesBySearch, transformMealPayloadToMockDataStructure } from '../api/fetchRecipes';

const Navbar = ({ 
  theme, 
  setTheme, 
  setNewData, 
  isLoggedIn,
  onLogout,
  currentUser,
  onLogin,
  isSearchOpen,
  onSearchToggle,
  searchQuery,
  onSearchChange
}) => {
  const [isLoginVisible, setIsLoginVisible] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };  

  const handleSearchClick = () => {
    onSearchToggle();
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
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
  }, [searchQuery, setNewData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const getUserDisplayInfo = () => {
    if (!currentUser) return { initial: '?', displayName: '' };
    return {
      initial: currentUser.displayName?.[0]?.toUpperCase() || currentUser.email?.[0]?.toUpperCase() || '?',
      displayName: currentUser.displayName || currentUser.email.split('@')[0]
    };
  };

  return (
    <div className={`w-full h-[55px] p-[40px] flex items-center justify-between px-[7%] transition duration-200 
      ${theme === "dark" ? "bg-[#1A1A1A] text-white" : "bg-white text-gray-900 shadow-md"}`}
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

      <div className="flex items-center gap-4">        <div className={`transition-all duration-300 ease-in-out overflow-hidden relative
          ${isSearchOpen ? "w-64 opacity-100 px-4" : "w-0 opacity-0 px-0"} 
          h-10 flex items-center border border-gray-400 rounded-full
          ${theme === "dark" ? "bg-white/20 border-gray-600" : "bg-white"}`}
        >
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search..."
            className={`bg-transparent w-full outline-none text-sm ${theme === "dark" ? "text-white" : "text-black"} placeholder:text-gray-500 pr-8`}
          />
          {isSearchOpen && searchQuery && (
            <button
              onClick={onSearchToggle}
              className={`absolute right-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
            >
              <span className="text-xl leading-none">&times;</span>
            </button>
          )}
        </div>

        <button
          className="bg-none border-none cursor-pointer text-inherit flex items-center"
          onClick={handleSearchClick}
          aria-label="Search"
        >
          <Search className="w-8 h-8" />
        </button>

        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>         
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold 
                ${theme === "dark" ? "bg-yellow-500" : "bg-yellow-400"} 
                text-white hover:opacity-90 transition-opacity`}
              aria-label="User menu"
            >
              {getUserDisplayInfo().initial}
            </button>

            {isDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50
                ${theme === "dark" ? "bg-[#2d2d2d] text-white" : "bg-white text-gray-900"}
                border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
              >
                <div className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700">
                  Signed in as<br />
                  <span className="font-semibold">{getUserDisplayInfo().displayName}</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">{currentUser?.email}</span>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-none border-none cursor-pointer text-inherit flex items-center"
            onClick={() => setIsLoginVisible(true)}
            aria-label="Sign in or sign up"
          >
            <CircleUserRound className="w-8 h-8" />
          </button>
        )}

        <button
          className="bg-none border-none cursor-pointer text-inherit flex items-center"
          onClick={toggle_mode}
        >
          {theme === "light" ? (
            <Moon className="w-8 h-8" />
          ) : (
            <Sun className="w-8 h-8" />
          )}
        </button>
      </div>
      
      {isLoginVisible && (
        <Login
          theme={theme}
          onLogin={(userData) => {
            setIsLoginVisible(false);
            onLogin(userData);
          }}
          setIsLoginVisible={setIsLoginVisible}
        />
      )}
    </div>
  );
};

export default Navbar;
