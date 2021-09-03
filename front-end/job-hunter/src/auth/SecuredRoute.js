import React from "react";
import { Redirect, Route } from "react-router-dom";

const SecuredRoute = ({ component: Component, ...otherProps }) => {
  return (
    <Route
      {...otherProps}
      render={(props) =>
        localStorage.getItem("jwtToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/signin/${otherProps.role}`} />
        )
      }
    />
  );
};

export default SecuredRoute;
