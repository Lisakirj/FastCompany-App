import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUser } from "../../store/users";
import { getProfessionsLoading, loadProfession } from "../../store/profession";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUserId = useSelector(getCurrentUser());
  const isLoading = useSelector(getProfessionsLoading());

  const handleClick = () => {
    history.push(history.location.pathname + "/edit");
  };
  useEffect(() => {
    dispatch(loadProfession);
  }, [dispatch]);
  if (isLoading) return "Loading...";
  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUserId === user._id && (
          <button
            onClick={handleClick}
            className="position-absolute top-0 end-0 btn btn-light btn-sm">
            <i className="bi bi-gear"></i>
          </button>
        )}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={user.img}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="100"
            height="100"
          />
          <div className="mt-3">
            <h4 className="fw-bold">{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
};
export default UserCard;
