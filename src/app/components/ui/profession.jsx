import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  getProfessionById,
  getProfessionsLoading,
} from "../../store/profession";

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoading());
  const profession = useSelector(getProfessionById(id));

  if (!isLoading) {
    return <p>{profession.name}</p>;
  } else return "Loading..";
};

Profession.propTypes = {
  id: PropTypes.string,
};
export default Profession;
