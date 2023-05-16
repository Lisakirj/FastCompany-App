import React, { useEffect } from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getQualitiesLoading } from "../../../store/qualities";
import { loadQualities } from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoading());

  useEffect(() => {
    dispatch(loadQualities());
  }, []);
  if (isLoading) return "Loading..";
  return (
    <>
      {qualities && qualities.map((qual) => <Quality key={qual} id={qual} />)}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
};
export default QualitiesList;
