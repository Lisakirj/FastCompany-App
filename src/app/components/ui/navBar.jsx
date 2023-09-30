import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { getisLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
  const { pathname } = useLocation();
  const isLoggedIn = useSelector(getisLoggedIn());

  return (
    <div className="container-fluid bg-light mb-4">
      <div className={`row  ${isLoggedIn ? "p-0" : "p-4"}`}>
        <nav className="d-flex justify-content-between align-items-center">
          <div className="d-flex fw-bold">
            <Link
              className="nav-link active d-flex align-items-center"
              aria-current="page"
              to="/">
              <i className="bi bi-house-door me-1 "></i>
              Main{" "}
            </Link>
            {isLoggedIn && (
              <Link className="nav-link d-flex align-items-center" to="/users">
                <i className="bi bi-people me-1 fs-4x"></i>
                Users
              </Link>
            )}
          </div>
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            pathname !== "/login" &&
            pathname !== "/login/registration" && (
              <Link className="nav-link fw-bold" to="/login">
                Login
              </Link>
            )
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
