import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { getCurrentUserData } from "../store/users";
import { useSelector } from "react-redux";

const MainPage = () => {
  const currentUser = useSelector(getCurrentUserData());
  return (
    <div className="row flex-column text-center align-items-center p-sm-0 p-5 mt-5">
      <h1 className="col mt-5 pt-5">Fast Company Main Page</h1>
      {currentUser ? (
        <>
          <h3>
            Ласкаво просимо
            <Link to={`users/${currentUser && currentUser._id}`}>
              <span className="text-dark ">, </span>
              <span className="text-primary ">
                {currentUser ? currentUser.name : ""} 👋🏻
              </span>
            </Link>
          </h3>
          <h4 className="pt-4 text-secondary">
            Тепер ти можеш знайти компанію для свого вечора!
          </h4>
          <Link className="nav-link mt-2" aria-current="page" to="users">
            <button className="btn btn-primary fw-bold py-2 ">
              ПОЇХАЛИ 🎉
            </button>
          </Link>
        </>
      ) : (
        <h4 className="col-sm-12  col-xl-10 col-8 text-center  mt-md-2 mt-3">
          <Link to="/login">Увійдіть</Link> або{" "}
          <Link to="/login/registration">зареєструйтесь</Link>, щоб скористатись
          нашим застосунком та знайти компанію на вечір 🍻
        </h4>
      )}
    </div>
  );
};

export default MainPage;
