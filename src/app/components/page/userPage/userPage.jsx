import React from "react";
import PropTypes from "prop-types";

import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/userMeetingsCard";
import Comments from "../../ui/userComments";
import BackHistoryButton from "../../common/backButton";

import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId));

  if (user) {
    return (
      <div className="container">
        <BackHistoryButton />
        <div className="row gutters-sm mt-2">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard qualities={user.qualities && user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comments />
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading..";
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};
export default UserPage;
