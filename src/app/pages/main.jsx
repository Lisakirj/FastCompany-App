import React from "react";
import { getCurrentUserData } from "../store/users";
// import useMockData from "../utils/mockData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const MainPage = () => {
  const currentUser = useSelector(getCurrentUserData());
  // const { error, status, progress, initialize } = useMockData();
  // const handleClick = () => {
  //   console.log("initialized");
  //   initialize();
  // };
  return (
    <div className="container mt-5">
      {/* <h3>Инициализация данных в FireBase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        {" "}
        Инициализировать
      </button> */}
      <div className="ms-3">
        <h1>Fast Company Main Page</h1>
        <h3>
          Добро пожаловать,{" "}
          <span className="text-primary">
            {currentUser ? currentUser.name : ""}
          </span>
        </h3>
        <h3>Теперь Вы можете найти компанию для своего вечера!</h3>
      </div>
      <Link className="nav-link" aria-current="page" to="users">
        <button className="btn btn-primary">LET'S GO</button>
      </Link>
    </div>
  );
};

export default MainPage;
