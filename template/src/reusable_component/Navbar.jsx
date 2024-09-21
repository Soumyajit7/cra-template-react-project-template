import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import FontAwesomeIcon from "../reusable_component/FontAwesomeIcon";
import { auth } from "../resources/firebase-config";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Method to toggle the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout method for user
  const handleLogout = async () => {
    try {
      await auth.signOut();
      // console.log("User logged out successfully!");
    } catch (error) {
      // console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyApp</Link>
      </div>
      <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
        </li>
        <li>
          <Link onClick={handleLogout}>Logout</Link>
        </li>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={isMenuOpen ? "fa-regular fa-xmark" : "fa-regular fa-bars"}
          size={24}
          color="white"
        />
      </div>
    </nav>
  );
};

export default Navbar;
