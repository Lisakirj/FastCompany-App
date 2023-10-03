import React from "react";
import PropTypes from "prop-types";

const MeetingsCard = ({ completedMeetings }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span className="fw-bold">Кількість зустрічей</span>
        </h5>

        <h1 className="display-1 text-primary">{completedMeetings}</h1>
      </div>
    </div>
  );
};

MeetingsCard.propTypes = {
  completedMeetings: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
export default MeetingsCard;
