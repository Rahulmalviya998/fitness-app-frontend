
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ onLogout }) {
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div className="fancy-header">
         <div className="menu-icon" onClick={toggleMenu}>
            &#9776; {/* Hamburger icon */}
         </div>
         <div className={`nav-links ${isOpen ? 'open' : ''}`}>
            <Link to="/home"><small>Home</small></Link>
            <Link to="/about"><small>About us</small></Link>
            <Link to="/myexercise"><small>Myexercise</small></Link>
            <Link to="/exercise"><small>Exercise</small></Link>
            <Link to="/store"><small>Store</small></Link>
            <Link to="/" className="header-link">
               <small onClick={onLogout}>Logout</small>
            </Link>
         </div>
      </div>
   );
}

export default Header;
