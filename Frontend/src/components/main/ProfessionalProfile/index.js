import React, { useEffect, useState } from "react";
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
import { getAwsDetails } from "utils/common";

import { createProfessionalProfile } from "api/profileApi";

import "./professionalProfile.scss";
import { useHistory } from "react-router-dom";
import Toaster from "components/shared/Toaster";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import { countryDialCodes } from "aws-amplify-react/lib/Auth/common/country-dial-codes";

function getSteps() {
  return [
    "Basic Information",
    "Contact Information",
    "Upload an image",
    "Professional Information",
    "Profile Completed",
  ];
}

export default function ProfessionalProfile() {
  const history = useHistory();
  const [showToaster, setToaster] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [showMessage, setMessage] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [countryCodes, setCountryCodes] = useState([]);
  const [error, setError] = useState({});
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    gender: "",
    experience: "",
    description: "",
    code: "+1",
    profAddr: "",
    typeOfUser: "Profes",
    imagebase64: "",
    primarySkill: "",
    secondarySkill: "",
    payPerhr: "",
    daysAvailable: "",
    fullName: "",
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
      } else if (!profile.profAddr) {
        err.profAddr = true;
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
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 3) {
      if (!profile.experience) {
        err.experience = true;
      } else if (!profile.primarySkill) {
        err.primarySkill = true;
      } else if (!profile.payPerhr) {
        err.payPerhr = true;
      } else if (!profile.daysAvailable) {
        err.daysAvailable = true;
      } else {
        saveProfile();
      }
    }
    setError(err);
  };
  function saveProfile() {
    setIsShowLoader(true);
    let payload = { ...profile };
    payload.fullName = payload.firstName + " " + payload.lastName;
    payload.mobileNumber = profile.code + profile.mobileNumber;
    delete payload.code;
    createProfessionalProfile(payload).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("profileCompleted", true);
        localStorage.setItem("serviceType", "PROF");
        setToaster(true);
        setMessage("Profile completed successfully");
        setTimeout(() => {
          history.push("/professional");
          setIsShowLoader(false);
        }, 1000);
      } else {
        setToaster(true);
        setMessage("Something went wrong");
        setIsShowLoader(false);
      }
    });
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep(3);
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
                  name="profAddr"
                  error={error.profAddr || false}
                  onChange={changeInput}
                  value={profile.profAddr}
                  fullWidth
                  required
                  label="Address"
                  variant="outlined"
                  multiline
                  rows={4}
                  helperText={error.profAddr && "Please enter address"}
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
                          <MenuItem value={countrycode}>{countrycode}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <Grid item xs={12}>
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
                </Grid>
              </div>
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
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  error={error.experience || false}
                  name="experience"
                  onChange={changeInput}
                  value={profile.experience}
                  fullWidth
                  required
                  label="Experience(In yrs)"
                  variant="outlined"
                  helperText={error.experience && "Please enter experience"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={error.primarySkill || false}
                  name="primarySkill"
                  onChange={changeInput}
                  value={profile.primarySkill}
                  fullWidth
                  required
                  label="Primary Skill"
                  variant="outlined"
                  helperText={
                    error.primarySkill && "Please enter primary skill"
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={error.secondarySkill || false}
                  name="secondarySkill"
                  onChange={changeInput}
                  value={profile.secondarySkill}
                  fullWidth
                  label="Secondary Skill"
                  variant="outlined"
                  helperText={
                    error.secondarySkill && "Please enter secondary skill"
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={error.payPerhr || false}
                  name="payPerhr"
                  onChange={changeInput}
                  value={profile.payPerhr}
                  fullWidth
                  type="number"
                  required
                  label="Pay per hour"
                  variant="outlined"
                  helperText={error.payPerhr && "Please enter pay per hr"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={error.daysAvailable || false}
                  name="daysAvailable"
                  onChange={changeInput}
                  value={profile.daysAvailable}
                  fullWidth
                  required
                  label="Days Available"
                  variant="outlined"
                  helperText={
                    error.daysAvailable && "Please enter Days Available"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.description || false}
                  name="description"
                  onChange={changeInput}
                  value={profile.description}
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  helperText={error.description && "Please enter description"}
                />
              </Grid>
            </Grid>
          )}
          {activeStep === 4 && (
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

            {activeStep !== 4 && (
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
                disabled={isShowLoader}
                variant="contained"
                color="secondary"
                onClick={handleSkip}
              >
                Skip
              </Button>
            )}
            {activeStep === 4 && (
              <Button
                disabled={isShowLoader}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Ok
              </Button>
            )}
            {isShowLoader && (
              <CircularProgress size={24} className="buttonProgress" />
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
