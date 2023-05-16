import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProfession } from "../../../store/profession";
import { loadQualities } from "../../../store/qualities";
import {
  getisLoggedIn,
  getLoadingStatus,
  loadUsers,
} from "../../../store/users";
import PropTypes from "prop-types";

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
  }, [isLoggedIn]);
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
