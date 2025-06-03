import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Navbar.css";
import logo_light from "../assets/logo-black.png";
import logo_dark from "../assets/logo-white.png";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";

const Navbar = ({ theme, setTheme, searchQuery, onSearchChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  
  const handleDropdownItemClick = (parentIndex,item) => {
    setActiveDropdown(parentIndex)
    setDropdownOpen(null);
    switch (item) {
      case "Breakfast":
        navigate("/breakfast");
        break;
      case "Lunch":
        navigate("/lunch");
        break;
      case "Dinner":
        navigate("/dinner");
        break;
      case "Trending":
        navigate("/trending");
        break;
      case "Top Rated":
        navigate("/top-rated");
        break;
      case "Chicken":
        navigate("/chicken");
        break;
      case "Beef":
        navigate("/beef");
        break;
      case "Pork chops":
        navigate("/pork chops");
        break;
      case "Vegan":
        navigate("/vegan");
        break;
      case "Keto":
        navigate("/keto");
        break;
      case "Gluten-Free":
        navigate("/gluten-free");
        break;
      case "Christmas":
        navigate("/christmas");
        break;
      case "Thanksgiving":
        navigate("/thanksgiving");
        break;
      case "Summer":
        navigate("/summer");
        break;
      case "Winter":
        navigate("/winter");
        break;
      default:
        navigate(`/?search=${item}`); // Default search for others
        break;
    }
  };

  const menuItems = [
    {
      name: "Recipe",dropdown: ["Breakfast", "Lunch", "Dinner"]},
    { name: "Popular", dropdown: ["Trending", "Top Rated"] },
    { name: "Meat", dropdown: ["Chicken", "Beef", "Pork chops"] },
    { name: "Healthy & Diet", dropdown: ["Vegan", "Keto", "Gluten-Free"] },
    { name: "Holidays", dropdown: ["Christmas", "Thanksgiving"] },
    { name: "Seasonal", dropdown: ["Summer", "Winter"] },
  ];

  return (
    <div className={`navbar ${theme === "dark" ? "navbar-dark" : "navbar-light"}`}>
      {/* Logo */}
      <Link to="/"> {/* Wrap the logo in a Link to navigate to the home page */}
        <img
          src={theme === "light" ? logo_light : logo_dark}
          alt="Logo"
          className="logo"
        />
      </Link>

      {/* Menu Items */}
      <ul className="flex space-x-6">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className= {`relative group cursor-pointer  ${ activeDropdown === index ? "underline underline-offset-[10px] font-semibold decoration-[3px] dark: decoration-azure-12" : ""}`}
            onMouseEnter={() => setDropdownOpen(index)}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            {item.name}
            {item.dropdown && (
              <ul
                className={`${dropdownOpen === index }`}
                
              >
                {item.dropdown.map((dropdownItem, i) => (
                  <li key={i} className="px-4 py-2 focus:bg-gray-100 text-black"
                    onClick={() =>{
                      
                      handleDropdownItemClick(index,dropdownItem)
                    } 
                  }
                  >
                    {dropdownItem}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          id="search-input"
          name="search"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={onSearchChange}
        />
        <img
          src={theme === "light" ? search_icon_dark : search_icon_light}
          alt="Search Icon"
        />
      </div>

      {/* Toggle Button */}
      <img
        onClick={toggle_mode}
        src={theme === "light" ? toggle_light : toggle_dark}
        alt="Toggle Icon"
        className="toggle-icon "
      />
    </div>
  );
};

export default Navbar;