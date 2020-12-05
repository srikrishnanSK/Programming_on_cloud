import React from "react";
import { Redirect, Switch } from "react-router-dom";

import UnAuthRoutes from "routes/UnAuthRoutes";
import ProfileAuthRoutes from "routes/ProfileAuthRoutes";
import UserAuthRoutes from "routes/UserAuthRoutes";
import ProfessionalAuthRoutes from "routes/ProfessionalAuthRoutes";
import Home from "components/home";

import ProfileLayout from "components/layouts/ProfileLayout";

import Login from "components/session/Login";
import Register from "components/session/Register";
import ConfirmSignup from "components/session/ConfirmSignup";
import ProfessionaLayout from "components/layouts/ProfessionaLayout";
import ForgotPassword from "components/session/ForgotPassword";
import UserLayout from "components/layouts/UserLayout";

const Routes = () => {
  return (
    <Switch>
      <UserAuthRoutes path={"/user"} component={UserLayout} />
      <ProfessionalAuthRoutes
        path={"/professional"}
        component={ProfessionaLayout}
      />
      <ProfileAuthRoutes path={"/profile"} component={ProfileLayout} />
      <UnAuthRoutes path={"/login"} component={Login} />
      <UnAuthRoutes path={"/register"} component={Register} />
      <UnAuthRoutes path={"/forgot-password"} component={ForgotPassword} />
      <UnAuthRoutes path={"/confirm-signup"} component={ConfirmSignup} />
      <UnAuthRoutes path={"/"} component={Home} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
