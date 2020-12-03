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
import { confirmSignup, resendOTP } from "../../../api/loginApi";
import Toaster from "components/shared/Toaster";

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
class ConfirmSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      code: "",
      loading: "",
      error: {
        email: false,
        code: false,
      },
      showToaster: false,
      toastMessage: "",
    };
  }

  UNSAFE_componentWillMount = () => {
    if (this.props.location.state) {
      let email = this.props.location.state.email;
      this.setState({ email });
    }
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
    this.handleConfirmSignup();
  };

  handleConfirmSignup = async () => {
    try {
      let { email, code } = this.state;
      let emailId = email.toLowerCase();

      let response = await confirmSignup(emailId, code);
      if (!response.code) {
        this.setState({
          loading: false,
          showToaster: true,
          toastMessage: "Your account is verified successfully",
        });
        setTimeout(() => {
          this.props.history.push("/login");
        }, 1000);
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
  validateForm = () => {
    let updatedError = { ...this.state.error };
    let showToaster = this.state.showToaster;
    let toastMessage = this.state.toastMessage;
    let valid = true;
    if (!this.state.code) {
      updatedError.code = true;
      valid = false;
      showToaster = true;
      toastMessage = "Enter Code";
    }
    this.setState({
      error: updatedError,
      showToaster: showToaster,
      toastMessage: toastMessage,
    });
    return valid;
  };
  resendOTP = async (e) => {
    e.preventDefault();
    try {
      let { email } = this.state;
      let emailId = email.toLowerCase();

      let response = await resendOTP(emailId);
      if (!response.code) {
        this.setState({
          loading: false,
          showToaster: true,
          toastMessage: "Sent OTP to your email ID successfully",
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
  render() {
    let { email, code, error } = this.state;
    let { classes } = this.props;
    return (
      <div className="signin flex justify-center w-full h-full-screen">
        <div className="p-8">
          <Card className="signin-card position-relative y-center">
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="h-full  position-relative">
                  <h4>Confirm Signup</h4>
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
                      disabled
                    />
                    <TextField
                      className="mb-3 w-full"
                      label="OTP"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="code"
                      type="text"
                      value={code}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                      error={error.code}
                    />

                    <div className="flex flex-wrap items-center mb-4">
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={this.state.loading}
                          type="submit"
                          className="submit-btn"
                        >
                          Submit
                        </Button>
                        {this.state.loading && (
                          <CircularProgress
                            size={24}
                            className="buttonProgress"
                          />
                        )}
                      </div>
                      <p className="foot">
                        <a href="#" onClick={this.resendOTP}>
                          Resend OTP
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

export default withStyles(styles, { withTheme: true })(ConfirmSignup);
