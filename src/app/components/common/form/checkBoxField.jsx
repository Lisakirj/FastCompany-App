import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };
  const getSelectClasses = () => {
    return "form-check-input" + (error ? " is-invalid" : "");
  };
  return (
    <div className="form-check mb-4 has-validation">
      <input
        className={getSelectClasses()}
        type="checkbox"
        value={value}
        id={name}
        name={name}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor={name} checked={value}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
};
export default CheckBoxField;
