import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ label, name, onChange, items, defaultValue }) => {
  const itemsArray =
    !Array.isArray(items) && typeof items === "object"
      ? Object.keys(items).map((item) => ({
          label: items[item].name,
          value: items[item]._id,
        }))
      : items;

  const handleChange = (value) => {
    // console.log(value);
    onChange({ name: name, value: value });
  };
  return (
    <>
      <div className="mb-4">
        <label className="form-label">{label}</label>
        <Select
          defaultValue={defaultValue}
          isMulti
          name={name}
          onChange={handleChange}
          options={itemsArray}
          className="basic-multi-select"
          classNamePrefix="select"
          closeMenuOnSelect={false}
        />
      </div>
    </>
  );
};

MultiSelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  defaultOptions: PropTypes.string,
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default MultiSelectField;
