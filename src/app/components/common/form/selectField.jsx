import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  name,
  onChange,
  value,
  defaultOptions,
  items,
  error,
}) => {
  //if object - (items)
  /*
  const itemsArray =
    !Array.isArray(items) && typeof items === "object"
      ? Object.keys(items).map((item) => ({
          name: items[item],
          id: items[item]._id,
        }))
      : items;
*/

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getSelectClasses = () => {
    return "form-select mb-2 mt-2 " + (error ? " is-invalid" : "");
  };
  return (
    <>
      <div className="mb-4">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <div className="input-group has-validation">
          <select
            id={name}
            name={name}
            className={getSelectClasses()}
            onChange={handleChange}
            value={value}>
            <option defaultValue={value === ""} disabled value="">
              {defaultOptions}
            </option>
            {items &&
              items.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    </>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  defaultOptions: PropTypes.string,
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default SelectField;
