import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getQualityById } from "../../../store/qualities";

const Quality = ({ id }) => {
  const quality = useSelector(getQualityById(id));
  const { _id, name, color } = quality;

  return (
    <span key={_id} className={"badge m-1 bg-" + color}>
      {name}
    </span>
  );
};
Quality.propTypes = {
  id: PropTypes.string.isRequired,
};
export default Quality;
