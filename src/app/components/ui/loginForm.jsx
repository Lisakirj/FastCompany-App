import React, { useEffect } from "react";
import { useState } from "react";

import FieldText from "../common/form/fieldText";
import { validator } from "../../utils/validator";

import CheckBoxField from "../common/form/checkBoxField";
import { getError, signIn } from "../../store/users";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });

  const [errors, setErrors] = useState({});
  const loginError = useSelector(getError());

  const validateConfig = {
    email: {
      isRequired: { message: "Email is required!" },
    },
    password: {
      isRequired: {
        message: "Password is required!",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validateConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prevState) => {
      return { ...prevState, [target.name]: target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    // console.log(data);
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    dispatch(signIn({ payload: data, redirect }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <FieldText
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        autoComplete=""
        error={errors.email}
      />
      <FieldText
        type="password"
        label="Password"
        name="password"
        value={data.password}
        onChange={handleChange}
        autoComplete="current-password"
        error={errors.password}
      />
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Stay in the system?
      </CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}>
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
