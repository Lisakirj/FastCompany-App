import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { logOut } from "../store/users";

const LogOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
  }, [dispatch]);
  return <>Loading..</>;
};

export default LogOut;
