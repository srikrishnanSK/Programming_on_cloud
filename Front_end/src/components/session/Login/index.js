import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./login.scss";
import { login } from "../../../api/loginApi";
import Toaster from "components/shared/Toaster";
import { isValidEmail } from "utils/common";
import { getProfessionalProfile, getUserProfile } from "api/profileApi";

const styles = () => ({
  signin: {
    background: "#1A2038",
  },
  wrapper: {
    position: "relative",
    width: "100%",
    "& button": {
      width: "100%",
    },
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});
class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: "",
    error: {
      email: false,
      password: false,
    },
    showToaster: false,
    toastMessage: "",
  };
  handleChange = (event) => {
    event.persist();
    let updatedError = { ...this.state.error };
    updatedError[event.target.name] = false;
    this.setState({
      [event.target.name]: event.target.value,
      error: updatedError,
    });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    let valid = this.validateForm();
    if (!valid) {
      return;
    }
    this.setState({
      loading: true,
    });
    this.handleLogin();
  };

  handleLogin = async () => {
    try {
      let { email, password } = this.state;
      let emailId = email.toLowerCase();
      let response = await login(emailId, password);
      if (response && response.signInUserSession) {
        this.saveUserInfo(response.signInUserSession);
      } else {
        this.setState({
          loading: false,
          showToaster: true,
          toastMessage: response.message,
        });
      }
    } catch (err) {
      // console.log(err);
    }
  };
  saveUserInfo = (data) => {
    localStorage.setItem("cognitoUser", JSON.stringify(data));
    getUserProfile().then((res) => {
      console.log(res);
      if (
        res.status === 200 &&
        res.data &&
        res.data.profileStatus &&
        res.data.profileStatus.toLowerCase() === "yes"
      ) {
        localStorage.setItem("token", true);
        localStorage.setItem("profileCompleted", true);
        localStorage.setItem("serviceType", "USER");
        this.props.history.push("/user/search-results");
        this.setState({ loading: false });
      } else {
        getProfessionalProfile().then((res) => {
          if (
            res.status === 200 &&
            res.data &&
            res.data.profileStatus &&
            res.data.profileStatus.toLowerCase() === "yes"
          ) {
            localStorage.setItem("token", true);
            localStorage.setItem("profileCompleted", true);
            localStorage.setItem("serviceType", "PROF");
            this.props.history.push("/professional");
            this.setState({ loading: false });
          } else {
            localStorage.setItem("token", true);
            this.props.history.push("/profile/basic");
          }
        });
      }
    });
    // // console.log(data);
  };
  validateForm = () => {
    let updatedError = { ...this.state.error };
    let showToaster = this.state.showToaster;
    let toastMessage = this.state.toastMessage;
    let valid = true;
    if (!this.state.email) {
      updatedError.email = true;
      valid = false;
      showToaster = true;
      toastMessage = "Enter Email";
    }
    if (this.state.username && !isValidEmail(this.state.username)) {
      updatedError.email = true;
      valid = false;
      showToaster = true;
      toastMessage = "Enter Valid Email";
    }
    if (!this.state.password) {
      updatedError.password = true;
      valid = false;
      showToaster = true;
      toastMessage = "Enter Password";
    }
    this.setState({
      error: updatedError,
      showToaster: showToaster,
      toastMessage: toastMessage,
    });
    return valid;
  };
  navigate = (e) => {
    e.preventDefault();
    this.props.history.push("/register");
  };
  forgot = (e) => {
    e.preventDefault();
    this.props.history.push("/forgot-password");
  };
  render() {
    let { email, password, error } = this.state;
    let { classes } = this.props;
    return (
      <div className="signin flex justify-center w-full h-full-screen">
        <div className="p-8">
          <Card className="signin-card position-relative y-center">
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="h-full  position-relative">
                  <h4>Login</h4>
                  <form
                    className="p-9"
                    ref={this.form}
                    onSubmit={this.handleFormSubmit}
                  >
                    <TextField
                      className="mb-3 w-full"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="text"
                      name="email"
                      value={email}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                      error={error.email}
                    />
                    <TextField
                      className="mb-3 w-full"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                      error={error.password}
                    />
                    <a href="#" className="forgot" onClick={this.forgot}>
                      Forgot Password?
                    </a>
                    <div className="flex flex-wrap items-center mb-4">
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={this.state.loading}
                          type="submit"
                          className="submit-btn"
                        >
                          Sign in
                        </Button>
                        {this.state.loading && (
                          <CircularProgress
                            size={24}
                            className="buttonProgress"
                          />
                        )}
                      </div>
                      <p className="foot">
                        You don't have an account?{" "}
                        <a href="#" onClick={this.navigate}>
                          Click Here
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
        <Toaster
          open={this.state.showToaster}
          message={this.state.toastMessage}
          type={"error"}
          onClose={() => this.setState({ showToaster: false })}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);
