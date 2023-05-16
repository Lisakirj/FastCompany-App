import React, { useState } from "react";

import LoginForm from "../components/ui/loginForm";
import Registration from "../components/ui/registrationForm";

const Login = ({ match }) => {
  const type = match.params.type;
  const [formType, setFormType] = useState(
    type === "Registration" ? type : "Login"
  );
  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "Registration" ? "Login" : "Registration"
    );
  };
  return (
    <div className="container mt-5  ">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-5 pt-4">
          <h3 className="pb-4 text-center">{formType}</h3>
          {formType === "Registration" ? (
            <>
              <Registration />{" "}
              <p className="mt-3 ">
                Already have an account?{" "}
                <a
                  className="color-primary text-decoration-none"
                  role="button"
                  onClick={toggleFormType}>
                  Sing In
                </a>
              </p>
            </>
          ) : (
            <>
              <LoginForm />
              <p className="mt-3">
                Don't have an account?{" "}
                <a
                  className="color-primary text-decoration-none"
                  role="button"
                  onClick={toggleFormType}>
                  Sing Up
                </a>
              </p>
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
