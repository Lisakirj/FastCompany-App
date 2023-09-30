import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { getCurrentUserData } from "../../store/users";

const BookMark = ({ user, onHandleAdd, onHandleRemove }) => {
  const currentUser = useSelector(getCurrentUserData());
  const [status, setStatus] = useState(false);

  const bookmarkStatus = useCallback(() => {
    return currentUser.bookmarks
      ? currentUser.bookmarks.some((bid) => bid === user._id)
      : false;
  }, [currentUser.bookmarks, user._id]);

  useEffect(() => {
    if (currentUser.bookmarks) {
      setStatus(bookmarkStatus());
    }
  }, [bookmarkStatus, currentUser.bookmarks]);

  const bookmarkAdd = () => {
    if (!bookmarkStatus()) {
      onHandleAdd(user._id);
      setStatus((prevState) => !prevState);
    } else {
      onHandleRemove(user._id);
      setStatus((prevState) => !prevState);
    }
  };
  return (
    <button onClick={bookmarkAdd} type="button" className="btn btn-primary">
      {status ? (
        <i className="bi bi-bookmark-fill"></i>
      ) : (
        <i className="bi bi-bookmark"></i>
      )}
    </button>
  );
};

BookMark.propTypes = {
  user: PropTypes.object,
  bookmark: PropTypes.array,
  status: PropTypes.bool,
  onHandleAdd: PropTypes.func,
  onHandleRemove: PropTypes.func,
  id: PropTypes.string,
};

export default BookMark;
