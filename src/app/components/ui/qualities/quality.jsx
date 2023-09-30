import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { getQualityById } from "../../../store/qualities";

const Quality = ({ id }) => {
  const { pathname } = useLocation();
  const quality = useSelector(getQualityById(id));
  const { _id, name, color } = quality;

  return (
    <span
      key={_id}
      className={`badge ${
        pathname !== "/users" && "col-3 p-2"
      } m-1 bg-${color}`}>
      {name}
    </span>
  );
};
Quality.propTypes = {
  id: PropTypes.string.isRequired,
};
export default Quality;
