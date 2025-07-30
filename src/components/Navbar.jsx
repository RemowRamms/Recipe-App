import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const location = useLocation();

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
    <nav className={`w-full transition duration-200 relative z-50 sticky top-0
      ${theme === "dark" ? "bg-[#1A1A1A] text-white" : "bg-white text-gray-900 shadow-md"}`}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <img
              src={theme === "light" ? logo_light : logo_dark}
              alt="Logo"
              className="h-8 sm:h-10 w-auto"
            />
            <h1
              className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-serif ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Food<span className="text-yellow-400">.</span>
            </h1>
          </Link>


          <ul className="hidden md:flex space-x-6 text-sm font-semibold uppercase">
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


          <div className="hidden md:flex items-center gap-3 lg:gap-4">

            <div className={`transition-all duration-300 ease-in-out overflow-hidden relative
              ${isSearchOpen ? "w-48 lg:w-64 opacity-100 px-4" : "w-0 opacity-0 px-0"} 
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
              className="bg-none border-none cursor-pointer text-inherit flex items-center p-1"
              onClick={handleSearchClick}
              aria-label="Search"
            >
              <Search className="w-6 h-6 lg:w-8 lg:h-8" />
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
                className="bg-none border-none cursor-pointer text-inherit flex items-center p-1"
                onClick={() => setIsLoginVisible(true)}
                aria-label="Sign in or sign up"
              >
                <CircleUserRound className="w-6 h-6 lg:w-8 lg:h-8" />
              </button>
            )}


            <button
              className="bg-none border-none cursor-pointer text-inherit flex items-center p-1"
              onClick={toggle_mode}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-6 h-6 lg:w-8 lg:h-8" />
              ) : (
                <Sun className="w-6 h-6 lg:w-8 lg:h-8" />
              )}
            </button>
          </div>


          <div className="flex md:hidden items-center gap-2">

            <button
              className="bg-none border-none cursor-pointer text-inherit flex items-center p-1"
              onClick={handleSearchClick}
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
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
                className="bg-none border-none cursor-pointer text-inherit flex items-center p-1"
                onClick={() => setIsLoginVisible(true)}
                aria-label="Sign in or sign up"
              >
                <CircleUserRound className="w-6 h-6" />
              </button>
            )}


            <button
              className="bg-none border-none cursor-pointer text-inherit flex items-center p-1"
              onClick={toggle_mode}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-6 h-6" />
              ) : (
                <Sun className="w-6 h-6" />
              )}
            </button>


            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-none border-none cursor-pointer text-inherit flex items-center p-1 ml-2"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 transition-all duration-300 ${
                  theme === "dark" ? "bg-white" : "bg-gray-900"
                } ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
                <span className={`block w-5 h-0.5 mt-1 transition-all duration-300 ${
                  theme === "dark" ? "bg-white" : "bg-gray-900"
                } ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
                <span className={`block w-5 h-0.5 mt-1 transition-all duration-300 ${
                  theme === "dark" ? "bg-white" : "bg-gray-900"
                } ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>


        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <div className={`w-full px-4 h-10 flex items-center border border-gray-400 rounded-full
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
              {searchQuery && (
                <button
                  onClick={onSearchToggle}
                  className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
                >
                  <span className="text-xl leading-none">&times;</span>
                </button>
              )}
            </div>
          </div>
        )}


        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 border-t ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}>
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300
                      ${isActive 
                        ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" 
                        : `${theme === "dark" ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"}`
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
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
    </nav>
  );
};

export default Navbar;
