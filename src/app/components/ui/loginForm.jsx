import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";

import CheckBoxField from "../common/form/checkBoxField";
import { getError, signIn } from "../../store/users";

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

  const validateConfig = useMemo(() => {
    return {
      email: {
        isRequired: { message: "Електронна пошта є обов'язкова!" },
      },
      password: {
        isRequired: {
          message: "Пароль є обов'язковий!",
        },
      },
    };
  }, []);

  const validate = useCallback(() => {
    const errors = validator(data, validateConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [data, validateConfig]);

  useEffect(() => {
    validate();
  }, [data, validate]);

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
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        autoComplete=""
        error={errors.email}
      />
      <TextField
        type="password"
        label="Пароль"
        name="password"
        value={data.password}
        onChange={handleChange}
        autoComplete="current-password"
        error={errors.password}
      />
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Залишатись в системі?
      </CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}>
        Увійти
      </button>
    </form>
  );
};

export default LoginForm;
