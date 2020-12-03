import React, { forwardRef, useEffect, useState } from "react";

import clsx from "clsx";
import { Link, useHistory, useLocation } from "react-router-dom";

import { Hidden, AppBar, Box, Menu, ListItem, List } from "@material-ui/core";
import projectLogo from "assets/images/logo.png";

import HeaderUserbox from "../HeaderUserbox";

import "./header.scss";
import { PROF_MENUS, USER_MENUS } from "utils/menus";

const LoadSubMenus = (props) => {
  return (
    <>
      <span
        key={"menu" + props.index}
        className={props.activeRoute.includes(props.menu.to) ? "active" : ""}
        onClick={(event) =>
          props.handleMenuClick(event.currentTarget, props.menu)
        }
      >
        {props.menu.label}
      </span>
    </>
  );
};

const SubMenu = forwardRef((props, ref) => {
  return (
    <Menu
      anchorEl={ref}
      open={Boolean(ref)}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      style={{
        width: "200px",
      }}
      onClose={props.onClose}
      // className="ml-2"
    >
      <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
        <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
          {props.subMenu.map((menu, index) => {
            return (
              <ListItem
                key={"submenu-" + index}
                button
                onClick={() => props.handleSubMenuClick(menu)}
              >
                {menu.label}
              </ListItem>
            );
          })}
        </List>
      </div>
    </Menu>
  );
});

const Header = (props) => {
  let serviceType = localStorage.getItem("serviceType");
  const history = useHistory();
  const location = useLocation();
  const [user] = useState("");
  const [activeRoute, setActiveRoute] = useState("");

  let [subMenuTarget, setSubMenuTarget] = useState(null);
  let [selectedMenu, setSelectedMenu] = useState({});
  let [menusList] = useState(
    serviceType === "USER"
      ? USER_MENUS
      : serviceType === "PROF"
      ? PROF_MENUS
      : []
  );

  useEffect(() => {}, []);
  useEffect(() => {
    setActiveRoute(location.pathname.toString());
  }, [location.pathname]);

  function handleMenuClick(target, menuInfo) {
    setSelectedMenu(menuInfo);
    setSubMenuTarget(target);
  }
  function changeRoute(path) {
    history.push(path);
  }

  function handleSubMenuClick(menuInfo) {
    setSubMenuTarget(null);
    history.push(menuInfo.to);
  }
  return (
    <>
      <AppBar
        color="secondary"
        className={clsx("app-header", props.isHome ? "home-header" : "")}
        position={"fixed"}
        elevation={3}
      >
        <Box className="app-header-toolbar">
          <Hidden mdDown>
            <div className={clsx("app-header-logo", {})}>
              <Box className="flex" title="Click & Go">
                <Link className="header-logo-wrapper-link">
                  <img
                    className="app-header-logo-img"
                    alt="Click & Go"
                    src={projectLogo}
                    width="120px"
                    height="60"
                  />
                </Link>
              </Box>
            </div>
          </Hidden>
          <Box className="d-flex align-items-center">
            {!props.isHome && (
              <div className="menus">
                {menusList.map((menu, index) => {
                  return menu.content ? (
                    <LoadSubMenus
                      key={"menu" + index}
                      menu={menu}
                      index={index}
                      activeRoute={activeRoute}
                      changeRoute={changeRoute}
                      handleMenuClick={handleMenuClick}
                    />
                  ) : (
                    <span
                      className={activeRoute === menu.to ? "active" : ""}
                      key={"menu" + index}
                      onClick={() => changeRoute(menu.to)}
                    >
                      {menu.label}
                    </span>
                  );
                })}
              </div>
            )}
            <HeaderUserbox user={user} {...props} />
          </Box>
        </Box>
        {subMenuTarget && (
          <SubMenu
            subMenu={selectedMenu.content}
            ref={subMenuTarget}
            onClose={() => setSubMenuTarget(null)}
            handleSubMenuClick={handleSubMenuClick}
          />
        )}
      </AppBar>
    </>
  );
};

export default Header;
