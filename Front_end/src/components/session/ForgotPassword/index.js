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
import { sendOTP, forgotPassword } from "../../../api/loginApi";
import Toaster from "components/shared/Toaster";
import { isValidEmail } from "utils/common";

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
class ForgotPasswords extends Component {
  state = {
    email: "",
    loading: "",
    isChangePassword: false,
    code: "",
    password: "",
    error: {
      email: false,
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
    if (!this.state.isChangePassword) {
      this.validateResend(event);
    } else {
      this.validateChangePassword(event);
    }
  };
  validateResend(event) {
    event.preventDefault();
    let valid = this.validateForm();
    if (!valid) {
      return;
    }
    this.setState({
      loading: true,
    });
    this.handleSendOTP();
  }
  validateChangePassword(event) {
    event.preventDefault();
    let valid = this.validateChangeForm();
    if (!valid) {
      return;
    }
    this.setState({
      loading: true,
    });
    this.handleChangePassword();
  }
  handleSendOTP = async () => {
    try {
      let { email } = this.state;
      let response = await sendOTP(email);
      if (response && response.CodeDeliveryDetails) {
        this.setState({ loading: false, isChangePassword: true });
        this.setState({
          loading: false,
          showToaster: true,
          toastMessage: "OTP sent to your email ID.Please check.",
        });
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
  handleChangePassword = async () => {
    try {
      let { email, code, password } = this.state;
      let emailId = email.toLowerCase();
      let response = await forgotPassword(emailId, code, password);
      if (response && response.code) {
        this.setState({
          loading: false,
          showToaster: true,
          toastMessage: response.message,
        });
      } else {
        this.setState({
          loading: false,
          showToaster: true,
          toastMessage: "Password changed successfully",
        });
        setTimeout(() => {
          this.props.history.push("/login");
        }, 1000);
      }
    } catch (err) {
      // console.log(err);
    }
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
    let email = this.state.email.toLowerCase();
    if (this.state.email && !isValidEmail(email)) {
      updatedError.email = true;
      valid = false;
      showToaster = true;
      toastMessage = "Enter Valid Email";
    }
    this.setState({
      error: updatedError,
      showToaster: showToaster,
      toastMessage: toastMessage,
    });
    return valid;
  };
  validateChangeForm = () => {
    let updatedError = { ...this.state.error };
    let showToaster = this.state.showToaster;
    let toastMessage = this.state.toastMessage;
    let valid = true;
    if (!this.state.code) {
      updatedError.code = true;
      valid = false;
      showToaster = true;
      toastMessage = "Enter OTP";
    }
    if (!this.state.password) {
      updatedError.code = true;
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
  gotoLogin = (e) => {
    e.preventDefault();
    this.props.history.push("/login");
  };
  renderSendOTP() {
    let { email, error } = this.state;

    return (
      <>
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
        <a href="#" className="forgot" onClick={this.gotoLogin}>
          Back to singin?
        </a>
      </>
    );
  }
  renderChangePassword() {
    let { code, password, error } = this.state;

    return (
      <>
        <TextField
          className="mb-3 w-full"
          variant="outlined"
          label="OTP"
          onChange={this.handleChange}
          type="text"
          name="code"
          value={code}
          validators={["required"]}
          errorMessages={["this field is required"]}
          error={error.code}
        />
        <TextField
          className="mb-3 w-full"
          variant="outlined"
          label="Password"
          onChange={this.handleChange}
          type="password"
          name="password"
          value={password}
          validators={["required"]}
          errorMessages={["this field is required"]}
          error={error.password}
        />
      </>
    );
  }
  render() {
    let { isChangePassword } = this.state;
    let { classes } = this.props;
    return (
      <div className="signin flex justify-center w-full h-full-screen">
        <div className="p-8">
          <Card className="signin-card position-relative y-center">
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="h-full  position-relative">
                  <h4>Forgot Password</h4>
                  <form
                    className="p-9"
                    ref={this.form}
                    onSubmit={this.handleFormSubmit}
                  >
                    {!isChangePassword && this.renderSendOTP()}
                    {isChangePassword && this.renderChangePassword()}
                    <div className="flex flex-wrap items-center mb-4">
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={this.state.loading}
                          type="submit"
                          className="submit-btn"
                        >
                          {!isChangePassword && "Send OTP"}
                          {isChangePassword && "Submit"}
                        </Button>
                        {this.state.loading && (
                          <CircularProgress
                            size={24}
                            className="buttonProgress"
                          />
                        )}
                      </div>
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

export default withStyles(styles, { withTheme: true })(ForgotPasswords);
