import React, { useEffect } from "react";
import { useState } from "react";

import FieldText from "../common/form/fieldText";
import { validator } from "../../utils/validator";

import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

import { useDispatch, useSelector } from "react-redux";
import { getQualitiesList } from "../../store/qualities";
import { getProfessionsList } from "../../store/profession";
import { signUp } from "../../store/users";

const Registration = () => {
  const dispatch = useDispatch();
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

  const [errors, setErrors] = useState({});

  const validateConfig = {
    name: {
      isRequired: { message: "Name is required!" },
      min: {
        message: "Name must contain at least 3 symbols!",
        value: 3,
      },
    },
    email: {
      isRequired: { message: "Email is required!" },
      isEmail: { message: "Email is not correct!" },
    },
    password: {
      isRequired: {
        message: "Password is required!",
      },
      isCapitalSymbol: {
        message: "Password must contain at least 1 capital symbol",
      },
      isContainDigit: {
        message: "Password must contain at least one number example",
      },
      min: {
        message: "Password must contain at least 8 symbols!",
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: "Please choose your profession!",
      },
    },
    license: {
      isRequired: {
        message:
          "You cannot use our service without Terms and Conditions agreement!",
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
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value),
    };
    // console.log(newData);
    dispatch(signUp(newData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldText
        label="Name"
        name="name"
        value={data.name}
        onChange={handleChange}
        autoComplete=""
        error={errors.name}
      />
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
      <SelectField
        label="Choose your profession"
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
        label="Choose your sex"
      />
      <MultiSelectField
        onChange={handleChange}
        items={qualitiesList}
        label="Choose qualities"
        name="qualities"
        defaultValue={data.qualities}
      />
      <CheckBoxField
        name="license"
        value={data.license}
        onChange={handleChange}
        error={errors.license}>
        I agree{" "}
        <a href="#" className="text-decoration-none">
          Terms and Conditions
        </a>
      </CheckBoxField>
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}>
        Sign Up
      </button>
    </form>
  );
};

export default Registration;
