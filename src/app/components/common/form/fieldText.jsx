import React, { useState } from "react";
import PropTypes from "prop-types";

const FieldText = ({
  type,
  label,
  name,
  value,
  onChange,
  autoComplete,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <>
      <div className="mb-3 row">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <div className="input-group has-validation">
          <input
            className={getInputClasses()}
            type={showPassword ? "text" : type}
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
            autoComplete={autoComplete}
          />
          {type === "password" && (
            <button
              onClick={toggleShowPassword}
              className="btn btn-outline-secondary"
              type="button">
              <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
            </button>
          )}

          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    </>
  );
};
FieldText.defaultProps = {
  type: "text",
};
FieldText.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default FieldText;
