import React from "react";
import PropTypes from "prop-types";
import Quality from "./qualities/quality";

const QualitiesCard = ({ qualities }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center ">
        <h5 className="card-title">
          <span className="fw-bold">Qualities</span>
        </h5>
        <div className="row justify-content-center">
          {qualities &&
            qualities.map((q) => {
              return <Quality key={q} id={q} />;
            })}
        </div>
      </div>
    </div>
  );
};

QualitiesCard.propTypes = {
  data: PropTypes.array,
};
export default QualitiesCard;
