import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem,
}) => {
  if (!Array.isArray(items)) {
    return (
      <>
        <ul className="list-group">
          {Object.keys(items).map((el) => (
            <li
              onClick={() => onItemSelect(items[el])}
              key={items[el][valueProperty]}
              className={
                "list-group-item" +
                (items[el] === selectedItem ? " active" : "")
              }>
              {items[el][contentProperty]}
            </li>
          ))}
        </ul>
      </>
    );
  }
  return (
    <ul className="list-group">
      {items.map((el) => (
        <li
          role="button"
          onClick={() => onItemSelect(el)}
          key={el[valueProperty]}
          className={
            "list-group-item" + (el === selectedItem ? " active" : "")
          }>
          {el[contentProperty]}
        </li>
      ))}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name",
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
export default GroupList;
