import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import LogOut from "./layouts/logOut";

import ProtectedRoute from "./components/common/protectedRoute";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login/:type?" component={Login} />
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/logout" component={LogOut} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </>
  );
};

export default App;
