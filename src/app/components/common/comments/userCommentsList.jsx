import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onDelete }) => {
  return comments.map((comment) => {
    return <Comment key={comment._id} comment={comment} onDelete={onDelete} />;
  });
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  onDelete: PropTypes.func,
};
export default CommentsList;
