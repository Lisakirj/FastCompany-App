import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";

import { useSelector } from "react-redux";
import { getCurrentUser, getUserById } from "../../../store/users";

const Comment = ({ comment, onDelete }) => {
  const user = useSelector(getUserById(comment.userId));
  const currentUserId = useSelector(getCurrentUser());

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={user.img}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user && user.name}{" "}
                    <span className="small">
                      - {displayDate(comment.createdAt)}
                    </span>
                  </p>
                  {currentUserId === comment.userId ? (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onDelete(comment._id)}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <p className="small mb-0">{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  onDelete: PropTypes.func,
};
export default Comment;
