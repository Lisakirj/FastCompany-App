import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect, useCallback, useMemo } from "react";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = useMemo(() => {
    return {
      content: {
        isRequired: {
          message: "Повідомлення не може бути пустим!",
        },
      },
    };
  }, []);

  const validate = useCallback(() => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [data, validatorConfig]);

  useEffect(() => {
    validate();
  }, [data, validate]);

  const clearForm = () => {
    setData({});
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          value={data.content || ""}
          onChange={handleChange}
          name="content"
          label="Повідомлення"
          error={errors.content}
        />

        <div className="d-flex justify-content-end">
          <button
            disabled={Object.keys(data).length === 0 || errors.content}
            className="btn btn-primary">
            Опублікувати
          </button>
        </div>
      </form>
    </div>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddCommentForm;
