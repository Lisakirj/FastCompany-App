import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsers } from "../../../store/users";
import PropTypes from "prop-types";

const UsersLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isUserDataLoaded = useSelector(getDataStatus());

  useEffect(() => {
    if (!isUserDataLoaded) {
      return dispatch(loadUsers());
    }
  }, []);

  if (!isUserDataLoaded) return "Loading...";
  return children;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default UsersLoader;
