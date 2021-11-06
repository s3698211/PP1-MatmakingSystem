import React from "react";
import jwtDecode from "jwt-decode";
import { Redirect, Route } from "react-router";
const SecuredAdminRoute = ({ component: Component, ...otherProps }) => {
  return (
    <Route
      {...otherProps}
      render={(props) =>
        checkAdmin(localStorage.getItem("jwtToken")) ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/admin/`} />
        )
      }
    />
  );
};

const checkAdmin = (token) => {
  if (localStorage.getItem("jwtToken")) {
    const data = jwtDecode(localStorage.getItem("jwtToken"));

    if (data.roles[0].authority === "ROLE_ADMIN") {
      return true;
    }
  }
  return false;
};
export default SecuredAdminRoute;
