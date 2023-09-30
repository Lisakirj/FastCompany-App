import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import LoginForm from "../components/ui/loginForm";
import Registration from "../components/ui/registrationForm";

const Login = ({ match }) => {
  const type = match.params.type;
  const [formType, setFormType] = useState(
    type === "registration" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "registration" ? "login" : "registration"
    );
  };
  return (
    <div className="container my-5  ">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-5 pt-4">
          <h3 className="pb-4 text-center">
            {formType[0].toUpperCase() + formType.slice(1)}
          </h3>
          {formType === "registration" ? (
            <>
              <Registration />{" "}
              <p className="mt-3 ">
                Вже маєте аккаунт?{" "}
                <Link
                  to="/login"
                  className="color-primary text-decoration-none"
                  role="button"
                  onClick={toggleFormType}>
                  Увійти
                </Link>
              </p>
            </>
          ) : (
            <>
              <LoginForm />
              <p className="mt-3">
                Не маєте аккаунту?{" "}
                <Link
                  to="login/registration"
                  className="color-primary text-decoration-none"
                  role="button"
                  onClick={toggleFormType}>
                  Зареєструватись
                </Link>
              </p>
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
