import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { loadProfession } from "../../../store/profession";
import { loadQualities } from "../../../store/qualities";
import {
  getisLoggedIn,
  getLoadingStatus,
  loadUsers,
} from "../../../store/users";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getisLoggedIn());
  const usersLoadingStatus = useSelector(getLoadingStatus());

  useEffect(() => {
    dispatch(loadQualities());
    dispatch(loadProfession());
    if (isLoggedIn) {
      dispatch(loadUsers());
    }
  }, [isLoggedIn, dispatch]);
  if (usersLoadingStatus) return "Loading...";
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
