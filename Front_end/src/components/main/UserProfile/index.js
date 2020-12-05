import React, { useState, useEffect } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { countryDialCodes } from "aws-amplify-react/lib/Auth/common/country-dial-codes.js";

import { createUserProfile } from "api/profileApi";

import "./userProfile.scss";
import { useHistory } from "react-router-dom";
import Toaster from "components/shared/Toaster";
import { getAwsDetails } from "utils/common";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";

function getSteps() {
  return [
    "Basic Information",
    "Contact Information",
    "Upload an image",
    "Profile Completed",
  ];
}

export default function UserProfile() {
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState({});
  const [showToaster, setToaster] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [showMessage, setMessage] = useState("");
  const [countryCodes, setCountryCodes] = useState([]);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    code: "+1",
    gender: "",
    typeOfUser: "User",
    imagebase64: "",
    profileStatus: "yes",
    email: getAwsDetails().payload.email,
    cognitoId: getAwsDetails().payload.sub,
  });

  const steps = getSteps();
  useEffect(init, []);
  function init() {
    setCountryCodes(countryDialCodes);
  }
  const handleNext = () => {
    let err = { ...error };
    if (activeStep === 0) {
      if (!profile.firstName) {
        err.firstName = true;
      } else if (!profile.lastName) {
        err.lastName = true;
      } else if (!profile.address) {
        err.address = true;
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      if (!profile.mobileNumber) {
        err.mobileNumber = true;
      } else if (profile.mobileNumber && profile.mobileNumber.length !== 10) {
        err.mobileNumber = true;
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 2) {
      if (!profile.imagebase64) {
        alert("Please upload image or skip");
      } else {
        saveProfile();
      }
    } else if (activeStep === 3) {
      saveProfile();
    }
    setError(err);
  };
  function saveProfile() {
    setIsShowLoader(true);
    let payload = { ...profile };
    payload.mobileNumber = profile.code + profile.mobileNumber;
    delete payload.code;
    createUserProfile(payload).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("profileCompleted", true);
        localStorage.setItem("serviceType", "USER");
        setTimeout(() => {
          history.push("/user/search-results");
          setIsShowLoader(false);
        }, 1000);
      } else {
        setIsShowLoader(false);
        setToaster(true);
        setMessage("Something went wrong");
      }
    });
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    saveProfile();
  };
  function changeInput(e) {
    let profileObj = { ...profile };
    let err = { ...error };
    profileObj[e.target.name] = e.target.value;
    err[e.target.name] = "";
    setError(err);
    setProfile(profileObj);
  }
  async function changeProfileImage(e) {
    let profileObj = { ...profile };
    let image = await getBase64(e.target.files[0]);
    profileObj["imagebase64"] = image;
    setProfile(profileObj);
  }
  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  return (
    <div className="profile">
      <Card>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Card>
      <div className="profileForm">
        <Card className="cardRoot">
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  error={error.firstName || false}
                  name="firstName"
                  onChange={changeInput}
                  value={profile.firstName}
                  fullWidth
                  required
                  label="First Name"
                  variant="outlined"
                  helperText={error.firstName && "Please enter first name"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  error={error.lastName || false}
                  onChange={changeInput}
                  value={profile.lastName}
                  fullWidth
                  required
                  label="Last Name"
                  variant="outlined"
                  helperText={error.lastName && "Please enter last name"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  error={error.address || false}
                  onChange={changeInput}
                  value={profile.address}
                  fullWidth
                  required
                  label="Address"
                  variant="outlined"
                  multiline
                  rows={4}
                  helperText={error.address && "Please enter address"}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={profile.gender}
                    onChange={changeInput}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          )}
          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="flex mobile">
                  <div className="w-20 pr-5">
                    <FormControl variant="outlined">
                      <Select
                        value={profile.code}
                        name="code"
                        onChange={changeInput}
                      >
                        {countryCodes.map((countrycode) => {
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
                    error={error.mobileNumber || false}
                    name="mobileNumber"
                    type="number"
                    onChange={changeInput}
                    value={profile.mobileNumber}
                    fullWidth
                    required
                    label="Mobile Number"
                    variant="outlined"
                    helperText={
                      !error.mobileNumber
                        ? "Please enter mobile number"
                        : error.mobileNumber && error.mobileNumber.length !== 10
                        ? "Please enter 10 digit mobile number"
                        : ""
                    }
                  />
                </div>
              </Grid>
            </Grid>
          )}
          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  name="imagebase64"
                  onChange={changeProfileImage}
                />
                <label
                  className="photo"
                  htmlFor="raised-button-file"
                  style={{
                    backgroundImage: `url(${profile.imagebase64})`,
                  }}
                >
                  {profile.imagebase64 && "Change Image"}
                  {!profile.imagebase64 && "Choose Image"}
                </label>
                <h4 className="text-center">Upload Profile Photo</h4>
              </Grid>
            </Grid>
          )}
          {activeStep === 3 && (
            <>
              <div className="profile-success">
                Profile created successfully
              </div>
            </>
          )}

          <Grid item xs={12} className="actions">
            {activeStep > 0 && (
              <Button
                disabled={isShowLoader}
                variant="contained"
                color="default"
                onClick={handleBack}
              >
                Back
              </Button>
            )}

            {activeStep !== 3 && (
              <Button
                disabled={isShowLoader}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            {activeStep === 2 && (
              <Button
                variant="contained"
                color="secondary"
                disabled={isShowLoader}
                type="submit"
                className="submit-btn"
                onClick={handleSkip}
              >
                Skip
              </Button>
            )}
            {isShowLoader && (
              <CircularProgress size={24} className="buttonProgress" />
            )}
            {activeStep === 3 && (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Ok
              </Button>
            )}
          </Grid>
        </Card>
      </div>
      <Toaster
        open={showToaster}
        message={showMessage}
        type={"error"}
        onClose={() => setToaster(false)}
      />
    </div>
  );
}
