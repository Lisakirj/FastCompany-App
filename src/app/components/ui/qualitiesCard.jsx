import React from "react";
import PropTypes from "prop-types";
// import Qualitie from "./qualities/quality";
import Quality from "./qualities/quality";

const QualitiesCard = ({ qualities }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        {qualities &&
          qualities.map((q) => {
            return (
              <p key={q} className="card-text">
                <Quality key={q} id={q} />
              </p>
            );
          })}
      </div>
    </div>
  );
};

QualitiesCard.propTypes = {
  data: PropTypes.array,
};
export default QualitiesCard;
