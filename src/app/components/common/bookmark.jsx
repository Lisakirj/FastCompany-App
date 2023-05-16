import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const BookMark = ({ user, onHandleAdd, onHandleRemove }) => {
  const currentUser = useSelector(getCurrentUserData());
  const [status, setStatus] = useState(false);
  function bookmarkStatus() {
    return currentUser.bookmarks
      ? currentUser.bookmarks.some((bid) => bid === user._id)
      : false;
  }
  useEffect(() => {
    if (currentUser.bookmarks) {
      setStatus(bookmarkStatus());
    }
  }, []);
  function bookmarkAdd() {
    if (!bookmarkStatus()) {
      onHandleAdd(user._id);
      setStatus((prevState) => !prevState);
    } else {
      onHandleRemove(user._id);
      setStatus((prevState) => !prevState);
    }
  }
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

export default BookMark;
