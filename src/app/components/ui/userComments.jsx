import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/userCommentsList";

import {
  createComment,
  deleteComment,
  getComments,
  getIsLoadingStatus,
  loadComments,
} from "../../store/comments";
import { getCurrentUser } from "../../store/users";

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(getComments());
  const isLoading = useSelector(getIsLoadingStatus());
  const currentUserId = useSelector(getCurrentUser());

  useEffect(() => {
    dispatch(loadComments(userId));
  }, [userId, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteComment(id));
  };

  const handleSubmit = (data) => {
    dispatch(createComment({ data, currentUserId, userId }));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList comments={sortedComments} onDelete={handleDelete} />
            ) : (
              "Loading.."
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
