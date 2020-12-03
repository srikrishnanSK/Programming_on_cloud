import React, { useEffect } from "react";

import { Box, Menu, Button, List, ListItem, Divider } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { logoutUser } from "../../../api/loginApi";
import { useHistory } from "react-router-dom";
import { getAwsDetails } from "utils/common";
import "./header.scss";

export default function HeaderUserbox(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [username, setUserName] = React.useState();

  let history = useHistory();
  useEffect(() => {
    let name = getAwsDetails();
    if (name.payload.name) {
      setUserName(name.payload.name);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogOut() {
    logoutUser().then(() => {
      localStorage.clear();
      history.push("/");
    });
  }
  function navigate() {
    let serviceType = localStorage.getItem("serviceType");
    setAnchorEl(null);
    if (serviceType === "USER") {
      history.push("/user/my-profile");
    } else {
      history.push("/professional/my-profile");
    }
  }

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        className="text-capitalize px-3 text-left btn-inverse d-flex align-items-center"
      >
        <Box className="icon">
          <AccountCircleIcon />
        </Box>
        <div className="username">
          <div className="font-weight-bold  line-height-1">{username}</div>
        </div>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        onClose={handleClose}
        className="ml-2"
        style={{
          width: "250px",
        }}
      >
        <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
          <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
            <Box>
              <AccountCircleIcon />
              {/* <Avatar sizes="44" alt="Emma Taylor" src={avatar5} /> */}
            </Box>
            <div className="pl-3  pr-3">
              <div className="font-weight-bold text-center pt-2 line-height-1">
                {username}
              </div>
            </div>
            <Divider className="w-100 mt-2" />
            {props.type === "DASH" && (
              <ListItem button onClick={navigate}>
                My Profile
              </ListItem>
            )}
            <ListItem button onClick={handleLogOut}>
              Logout
            </ListItem>
          </List>
        </div>
      </Menu>
    </>
  );
}
