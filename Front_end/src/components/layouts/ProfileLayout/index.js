import React, { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { ThemeProvider } from "@material-ui/styles";

import Header from "components/shared/Header";

import "./ProfileLayout.scss";
import MuiTheme from "theme";

import ProfessionalProfile from "components/main/ProfessionalProfile";
import UserProfile from "components/main/UserProfile";
// import { getUserProfile, getProfessionalProfile } from "api/profileApi";

const Basic = lazy(() => import("components/main/Basic"));

function ProfileLayout() {
  useEffect(init, []);

  function init() {
    // getProfStatus();
  }
  // function getProfStatus() {
  //   getUserProfile().then((res) => {
  //     console.log(res);
  //     if (res) {
  //       getProfessionalProfile().then((res) => {
  //         console.log("called", res);
  //       });
  //     }
  //   });
  // }

  const pageVariants = {
    initial: {
      opacity: 0,
      // scale: 0.99
    },
    in: {
      opacity: 1,
      // scale: 1
    },
    out: {
      opacity: 0,
      // scale: 1.01
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };
  return (
    <ThemeProvider theme={MuiTheme}>
      <div className="app-wrapper">
        <Header isHome={true} />
        <div className="app-main app-main-sidebar-static">
          <div className="app-content">
            <div className="app-content--inner">
              <div className="app-content--inner__wrapper">
                <AnimatePresence>
                  <Suspense
                    fallback={
                      <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
                        <div className="w-50 mx-auto"></div>
                      </div>
                    }
                  >
                    <Switch>
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <Route exact path="/profile/basic" component={Basic} />
                        <Route
                          exact
                          path="/profile/user"
                          component={UserProfile}
                        />
                        <Route
                          exact
                          path="/profile/professional"
                          component={ProfessionalProfile}
                        />
                        <Redirect from="/profile" to="/profile/basic" />
                      </motion.div>
                    </Switch>
                  </Suspense>
                </AnimatePresence>
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ProfileLayout;
