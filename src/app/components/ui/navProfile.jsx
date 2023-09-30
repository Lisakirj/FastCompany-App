import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  if (!currentUser) return "Loading...";
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center  justify-content-center">
        <div className="me-2 fw-bold d-flex align-items-center">
          <i className="bi bi-person me-1 fs-4x"></i>
          {currentUser.name}
        </div>
        <img
          src={currentUser.img}
          alt="userPicture"
          className="img-responsive rounded-circle"
          width={"70"}
        />
      </div>
      <div className={"w-100 dropdown-menu my-2" + (isOpen ? " show" : "")}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item ">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item text-danger">
          Log out
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
