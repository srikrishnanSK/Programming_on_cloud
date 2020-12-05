import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import "./basic.scss";
import {
  getUserProfile,
  getProfessionalProfile,
  updatedUserProfile,
  updatedProfessionalProfile,
} from "api/profileApi";
import { getAwsDetails } from "utils/common";
import Toaster from "components/shared/Toaster";
import { CircularProgress } from "@material-ui/core";

export default function MyProfile() {
  const [error, setError] = useState({});
  const [showToaster, setToaster] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [showMessage, setMessage] = useState("");

  const [profile, setProfile] = useState(reqPayload());
  useEffect(init, []);
  function init() {
    let serviceType = localStorage.getItem("serviceType");
    if (serviceType === "PROF") {
      setServiceType(serviceType);
      getProfessionalProfileData(reqPayload(serviceType));
    } else {
      setServiceType(serviceType);
      getUserProfileData(reqPayload(serviceType));
    }
  }
  function reqPayload(servType) {
    if (servType === "USER") {
      return {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        address: "",
        gender: "",
        typeOfUser: "User",
        imagebase64: "",
        profileStatus: "yes",
        email: getAwsDetails().payload.email,
        cognitoId: getAwsDetails().payload.sub,
      };
    } else {
      return {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        gender: "",
        experience: "",
        description: "",
        profAddr: "",
        address: "",
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
      };
    }
  }
  function getUserProfileData(profObj) {
    getUserProfile().then((res) => {
      if (res.status === 200) {
        for (const key in res.data) {
          if (key in profObj) {
            profObj[key] = res.data[key];
            profObj["userId"] = res.data["userId"];
          }
        }
        setProfile(profObj);
      }
    });
  }
  function getProfessionalProfileData(profObj) {
    getProfessionalProfile().then((res) => {
      for (const key in res.data) {
        if (key in profObj) {
          profObj[key] = res.data[key] || null;
          profObj["professionalID"] = res.data["professionalID"];
        }
      }
      setProfile(profObj);
    });
  }
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
  const updateProfile = () => {
    if (serviceType === "PROF") {
      updateProfessionalProfile();
    } else {
      updateUserProfile();
    }
  };
  function updateUserProfile() {
    let err = { ...error };
    if (!profile.firstName) {
      err.firstName = true;
    } else if (!profile.lastName) {
      err.lastName = true;
    } else if (!profile.address) {
      err.address = true;
    } else if (!profile.mobileNumber) {
      err.mobileNumber = true;
    } else if (profile.mobileNumber && profile.mobileNumber.length !== 10) {
      err.mobileNumber = true;
    } else {
      setIsShowLoader(true);
      updatedUserProfile(profile).then((res) => {
        if (res.status === 200) {
          setToaster(true);
          setMessage("Profile updated successfully");
          setIsShowLoader(false);
        } else {
          setToaster(true);
          setMessage("Something went wrong");
          setIsShowLoader(false);
        }
      });
    }
    setError(err);
  }
  function updateProfessionalProfile() {
    let err = { ...error };
    if (!profile.firstName) {
      err.firstName = true;
    } else if (!profile.lastName) {
      err.lastName = true;
    } else if (!profile.profAddr) {
      err.profAddr = true;
    } else if (!profile.mobileNumber) {
      err.mobileNumber = true;
    } else if (profile.mobileNumber && profile.mobileNumber.length !== 10) {
      err.mobileNumber = true;
    } else if (!profile.experience) {
      err.experience = true;
    } else if (!profile.primarySkill) {
      err.primarySkill = true;
    } else if (!profile.payPerhr) {
      err.payPerhr = true;
    } else if (!profile.daysAvailable) {
      err.daysAvailable = true;
    } else {
      setIsShowLoader(true);
      updatedProfessionalProfile(profile).then((res) => {
        if (res.status === 200) {
          setToaster(true);
          setMessage("Profile updated successfully");
          setIsShowLoader(false);
        } else {
          setToaster(true);
          setMessage("Something went wrong");
          setIsShowLoader(false);
        }
      });
    }
    setError(err);
  }
  return (
    <>
      <div className="my-profileForm">
        <Card>
          <Grid item xs={12} className="actions">
            <div className="title">Edit Profile</div>
            <div>
              {isShowLoader && (
                <CircularProgress size={24} className="buttonProgress" />
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={updateProfile}
                disabled={isShowLoader}
              >
                Update
              </Button>
            </div>
          </Grid>
          <div className="cardRoot">
            <Grid container spacing={3}>
              <Grid item xs={2}>
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
              <Grid item xs={10}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
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
                  <Grid item xs={4}>
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
                  </Grid>{" "}
                  <Grid item xs={4}>
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
                  </Grid>{" "}
                  <Grid item xs={4}>
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
                        error.mobileNumber
                          ? "Please enter mobile number"
                          : error.mobileNumber &&
                            error.mobileNumber.length !== 10
                          ? "Please enter 10 digit mobile number"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      error={error.email || false}
                      name="email"
                      value={profile.email}
                      fullWidth
                      required
                      disabled
                      label="Email"
                      variant="outlined"
                    />
                  </Grid>
                  {serviceType !== "PROF" && (
                    <Grid item xs={4}>
                      <TextField
                        name="address"
                        error={error.address || false}
                        onChange={changeInput}
                        value={profile.address}
                        fullWidth
                        required
                        label="Address"
                        variant="outlined"
                        helperText={error.address && "Please enter address"}
                      />
                    </Grid>
                  )}
                  {serviceType === "PROF" && (
                    <Grid item xs={4}>
                      <TextField
                        name="profAddr"
                        error={error.profAddr || false}
                        onChange={changeInput}
                        value={profile.profAddr}
                        fullWidth
                        required
                        label="Address"
                        variant="outlined"
                        helperText={error.profAddr && "Please enter address"}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>

            {serviceType === "PROF" && (
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    name="profAddr"
                    error={error.experience || false}
                    onChange={changeInput}
                    value={profile.experience}
                    fullWidth
                    required
                    label="Experience(In yrs)"
                    variant="outlined"
                    helperText={error.experience && "Please enter experience"}
                  />
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
          </div>
        </Card>
      </div>
      <Toaster
        open={showToaster}
        message={showMessage}
        type={"success"}
        onClose={() => setToaster(false)}
      />
    </>
  );
}
