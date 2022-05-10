import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="navbarUl">
          <li className="navbar">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="navbar">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="navbar">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbarUl">
          <li className="navbar">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="navbar">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header  className="mainheader">
      
        <div>
        <Link to="/">
          <img src="images/mainlogo.png" alt="Shop My Closet Logo"/>
        </Link>
        </div>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
