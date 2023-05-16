import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ name, value, onChange, items, label }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div>
      <div className="mb-4">
        <label className="form-label">{label}</label>
        <div>
          {items &&
            items.map((item) => {
              return (
                <div
                  className="form-check form-check-inline"
                  key={item.name + "_" + item.value}>
                  {" "}
                  <input
                    key={item.name + "_" + item.value}
                    className="form-check-input"
                    type="radio"
                    name={name}
                    id={item.name + "_" + item.value}
                    value={item.value}
                    onChange={handleChange}
                    checked={item.value === value}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={item.name + "_" + item.value}>
                    {item.name}
                  </label>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
RadioField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.array,
};
export default RadioField;
