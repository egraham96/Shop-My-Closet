import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="navbarUl1">
          {<li className="navbarli">
            <Link to="/Upload">
              Add New Product
            </Link>
      </li>}
          <li className="navbarli">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="navbarli">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbarUl2">
          <li className="navbarli">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="navbarli">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <div className="mainheader">
        
        <Link to="/">
          <img src="images/mainlogo.png" alt="Shop My Closet Logo"/>
        </Link>
        

      <nav>
        {showNavigation()}
      </nav>
    </div>
  );
}

export default Nav;
