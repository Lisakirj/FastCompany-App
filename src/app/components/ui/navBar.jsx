import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getisLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
  const isLoggedIn = useSelector(getisLoggedIn());
  return (
    <nav className="navbar bg-light">
      <div className="contaier-fluid d-flex">
        <Link className="nav-link active" aria-current="page" to="/">
          Main
        </Link>
        {isLoggedIn && (
          <Link className="nav-link" to="/users">
            Users
          </Link>
        )}
      </div>
      {isLoggedIn ? (
        <div className="px-5 d-flex">
          <NavProfile />
        </div>
      ) : (
        <Link className="nav-link" to="/login">
          Login
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
