import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./login.scss";
import { register } from "../../../api/loginApi";
import Toaster from "components/shared/Toaster";
import { countryDialCodes } from "aws-amplify-react/lib/Auth/common/country-dial-codes.js";
import { isValidEmail } from "utils/common";
import FormControl from "@material-ui/core/FormControl";

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
class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
    code: "+1",
    loading: "",
    error: {
      name: false,
      email: false,
      phone_number: false,
      password: false,
    },
    showToaster: false,
    toastMessage: "",
    countryDialCodes: [],
  };
  componentWillMount() {
    this.setState({ countryDialCodes });
  }
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
    this.handleRegister();
  };

  handleRegister = async () => {
    try {
      let { email, name, password, code, phone_number } = this.state;
      let emailId = email.toLowerCase();

      let data = {
        username: emailId,
        password,
        attributes: {
          email,
          phone_number: code + phone_number,
          name,
        },
      };
      let response = await register(data);
      if (response && response.user) {
        this.setState({ loading: false });
        this.props.history.push(`/confirm-signUp`, {
          email: emailId,
        });
      } else {
        this.setState({
          loading: false,
          showToaster: true,
          toastMessage: response.message,
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
        showToaster: true,
        toastMessage: "Check email and password",
      });
    }
  };

  validateForm = () => {
    let updatedError = { ...this.state.error };
    let showToaster = this.state.showToaster;
    let toastMessage = this.state.toastMessage;
    let valid = true;
    if (!this.state.name) {
      updatedError.name = true;
      valid = false;
      showToaster = true;
      toastMessage = "Enter Username";
    }
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
    if (!this.state.phone_number) {
      updatedError.phone_number = true;
      valid = false;
      showToaster = true;
      toastMessage = "Enter Phone Number";
    } else if (
      this.state.phone_number &&
      this.state.phone_number.length !== 10
    ) {
      updatedError.phone_number = true;
      valid = false;
      showToaster = true;
      toastMessage = "Enter 10 dogit phone number";
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
    this.props.history.push("/login");
  };
  render() {
    let {
      email,
      password,
      error,
      name,
      phone_number,
      countryDialCodes,
      code,
    } = this.state;
    let { classes } = this.props;
    return (
      <div className="signin flex justify-center w-full h-full-screen">
        <div className="p-8">
          <Card className="signin-card position-relative y-center">
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="h-full  position-relative">
                  <h4>Create an account</h4>
                  <form
                    className="p-9"
                    ref={this.form}
                    onSubmit={this.handleFormSubmit}
                  >
                    <TextField
                      className="mb-3 w-full"
                      variant="outlined"
                      label="Username"
                      onChange={this.handleChange}
                      type="text"
                      name="name"
                      value={name}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                      error={error.name}
                    />
                    <TextField
                      className="mb-3 w-full"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid",
                      ]}
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
                      minLength={6}
                    />
                    <div className="flex">
                      <div className="w-20 pr-5">
                        <FormControl variant="outlined">
                          <Select
                            value={code}
                            name="code"
                            onChange={this.handleChange}
                          >
                            {countryDialCodes.map((countrycode) => {
                              return (
                                <MenuItem value={countrycode}>
                                  {countrycode}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                      <TextField
                        className="mb-3 w-full"
                        label="Phone Number"
                        variant="outlined"
                        onChange={this.handleChange}
                        name="phone_number"
                        type="number"
                        value={phone_number}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        error={error.phone_number}
                      />
                    </div>
                    <div className="flex flex-wrap items-center mb-4">
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={this.state.loading}
                          type="submit"
                          className="submit-btn"
                        >
                          Register
                        </Button>
                        {this.state.loading && (
                          <CircularProgress
                            size={24}
                            className="buttonProgress"
                          />
                        )}
                      </div>
                      <p className="foot">
                        Already you have an account?{" "}
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

export default withStyles(styles, { withTheme: true })(Register);
