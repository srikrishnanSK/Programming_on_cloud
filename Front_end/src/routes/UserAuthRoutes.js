import React from "react";
import { Route, Redirect } from "react-router-dom";

const UserAuthRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") &&
        localStorage.getItem("profileCompleted") &&
        localStorage.getItem("serviceType") === "USER" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/profile/basic",
            }}
          />
        )
      }
    />
  );
};

export default UserAuthRoutes;
