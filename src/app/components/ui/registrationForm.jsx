import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

import { validator } from "../../utils/validator";

import { getQualitiesList } from "../../store/qualities";
import { getProfessionsList } from "../../store/profession";
import { signUp } from "../../store/users";

const Registration = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false,
  });
  const professions = useSelector(getProfessionsList());
  const qualities = useSelector(getQualitiesList());

  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));

  const validateConfig = useMemo(
    () => ({
      name: {
        isRequired: { message: "Ім'я є обов'язковим!!" },
        min: {
          message: "Ім'я повинно містити як мінімум 3 символи!",
          value: 3,
        },
      },
      email: {
        isRequired: { message: "Електронна пошта є обов'язкова!" },
        isEmail: { message: "Адреса електронної пошти невірна!" },
      },
      password: {
        isRequired: {
          message: "Пароль є обов'язковий!",
        },
        isCapitalSymbol: {
          message: "Пароль повинен містити як мінімум 1 заголовну літеру",
        },
        isContainDigit: {
          message: "Пароль повинен містити як мінімум 1 цифру",
        },
        min: {
          message: "Пароль повинен містити як мінімум 8 символів!",
          value: 8,
        },
      },
      profession: {
        isRequired: {
          message: "Будь ласка, обери свою професію!",
        },
      },
      license: {
        isRequired: {
          message:
            "Ви не можете користуватися нашим сервісом без погодження  умов щодо користування!",
        },
      },
    }),
    []
  );

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
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value),
    };
    // console.log(newData);
    dispatch(signUp(newData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Ім'я"
        name="name"
        value={data.name}
        onChange={handleChange}
        autoComplete=""
        error={errors.name}
      />
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
      <SelectField
        label="Обери свою професію"
        name="profession"
        onChange={handleChange}
        value={data.profession}
        defaultOptions="Choose.."
        items={professions}
        error={errors.profession}
      />
      <RadioField
        name="sex"
        onChange={handleChange}
        value={data.sex}
        items={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
        label="Стать"
      />
      <MultiSelectField
        onChange={handleChange}
        items={qualitiesList}
        label="Обери свої якості"
        name="qualities"
        defaultValue={data.qualities}
      />
      <CheckBoxField
        name="license"
        value={data.license}
        onChange={handleChange}
        error={errors.license}>
        I agree{" "}
        <a href="/" className="text-decoration-none">
          Terms and Conditions
        </a>
      </CheckBoxField>
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}>
        Зареєструватись
      </button>
    </form>
  );
};

export default Registration;
