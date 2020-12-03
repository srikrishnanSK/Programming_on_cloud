import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";
import data from "../Details/data";
import { Auth } from "aws-amplify";

import {
  getPendingAppointments,
  getPastAppointments,
  getUpcomingAppointments,
  confirmAppointment,
  appintmentCancelByProfes,
} from "api/professionalApi";
import { getProfessionalProfile } from "api/profileApi";
import "./professionalDashboard.scss";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTop: "1px solid #e0dbdb",
  },
  results: {
    flexGrow: 1,
    paddingTop: "24px",
    padding: "20px",
  },
  header: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
  },
  noRecords: {
    padding: "50px 20px",
  },
  card: {
    margin: "auto",
    transition: "0.3s",
    border: " 1px solid #dadada",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "100%",
  },
  content: {
    textAlign: "left",
    padding: "0px",
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -theme.spacing.unit,
    },
  },
}));

function ProfessionalDashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [Userid, setUserid] = useState();
  Auth.currentUserInfo().then((userInfo) => {
    const { attributes = {} } = userInfo;
    setUserid(attributes["sub"]);
  });

  const service = data.services.find((x) => x.cognitoId === Userid);


  const [value, setValue] = React.useState(0);
  const [finalResults, setFinalResult] = React.useState([]);
  const [profId, setProfId] = React.useState(null);

  useEffect(init, []);

  function init() {
    getProfessionalProfileData(0);
  }
  function getProfessionalProfileData() {
    getProfessionalProfile().then((res) => {
      setProfId(res.data.professionalID);
      getAppointmentData(0, res.data.professionalID);
    });
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    getAppointmentData(newValue);
  };
  async function getAppointmentData(newValue, professionalId) {
    if (newValue === 0) {
      let res = await getPendingAppointments(professionalId || profId);
      console.log(res.data);
      setFinalResult(res.data);
    } else if (newValue === 1) {
      let res = await getUpcomingAppointments(professionalId || profId);
      setFinalResult(res.data);
    } else if (newValue === 2) {
      let res = await getPastAppointments(professionalId || profId);
      setFinalResult(res.data);
    }
  }

  async function appintmentAction(appointmentID) {
    let res = await confirmAppointment(appointmentID);
    console.log(res);
  }

  async function appintmentCancel(appointmentID) {
    let res = await appintmentCancelByProfes(appointmentID);
    console.log(res);
  }

  const Post = (appointmentID) => {
    console.log(appointmentID);
    appintmentAction(appointmentID);
  };

  const PostCancel = (appointmentID) => {
    console.log(appointmentID);
    appintmentCancel(appointmentID);
  };

  console.log(finalResults);
  return (
    <section className="prof-page">
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Pending Appointments" />
          <Tab label="Upcoming Appointments" />
          <Tab label="Past Appointments" />
          <Tab label="Digital ID" />
        </Tabs>
        <Card className={classes.root}>
          <div className={classes.results}>
            {value != 3 && (<Grid container spacing={2}>
              {finalResults &&
                finalResults.length > 0 &&
                finalResults.map((result) => {
                  return (
                    <Grid item xs={3}>
                      <Card
                        className={classes.card}
                        key={result.appointmentInfo}
                      >
                        <CardContent
                          className={classes.content}
                          style={{ justifyContent: "center" }}
                        >
                          <div className="header">
                            <span>
                              <span className="date-time">
                                {result.appointmentDate} &nbsp;
                                {result.appointmentTime}
                              </span>
                            </span>
                          </div>

                          <Typography
                            className={"MuiTypography--subheading"}
                            variant={"subtitle1"}
                            align={"center"}
                          >
                            {result.appointmentInfo}
                          </Typography>
                          <Typography
                            className={"MuiTypography--heading mt-10"}
                            variant={"h5"}
                            align={"center"}
                            gutterBottom
                          >
                            <small>
                              <b>User Address:</b>
                              {result.userAddress}
                            </small>
                          </Typography>

                          <Typography
                            className={"MuiTypography--heading mt-10"}
                            variant={"h5"}
                            align={"center"}
                            gutterBottom
                          >
                            <small>
                              <b>Check In:</b>
                              {result.appointmentCheckIn}
                            </small>
                          </Typography>
                          <div className="ml-auto">
                            <span
                              class={
                                result.appointmentStatus === "Pending"
                                  ? "status pending"
                                  : "status confirmed"
                              }
                            >
                              {result.appointmentStatus}
                            </span>
                          </div>

                          <Divider className={classes.divider} light />
                          <div className="text-center">
                            {" "}
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => Post(result.appointmentID)}
                            >
                              Confirm
                            </Button>
                            <Button
                              className="ml-5"
                              variant="contained"
                              color="secondary"
                              onClick={() => PostCancel(result.appointmentID)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              {finalResults && finalResults.length === 0 && (
                <Grid item xs={3}>
                  <Card className={classes.noRecords}>
                    <CardContent
                      className={classes.content}
                      style={{ justifyContent: "center" }}
                    >
                      There is no appointments available
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>)}
            {value === 3 && (
              <Grid item xs={3}>
                <Card className={classes.noRecords}>
                  <CardContent
                    className={classes.content}
                    style={{ justifyContent: "center" }}
                  >
                  <Typography
                      className={"MuiTypography--subheading"}
                      variant={"h3"}
                      align={"center"}
                    >
                      Click & Go Services
                    </Typography>
                    <Typography
                      className={"MuiTypography--subheading"}
                      variant={"h5"}
                      align={"center"}
                    >
                    Name:{service.firstName} {service.lastName}
                    </Typography>
                    <Typography
                      className={"MuiTypography--subheading"}
                      variant={"h5"}
                      align={"center"}
                    >
                      Primary Skill:- {service.primarySkill}
                    </Typography>
                    <Typography
                      className={"MuiTypography--subheading"}
                      variant={"h5"}
                      align={"center"}
                    >
                      Secondary Skill:- {service.secondarySkill}
                    </Typography>
                    <Typography
                      className={"MuiTypography--subheading"}
                      variant={"h5"}
                      align={"center"}
                    >
                      Id:-{service.professionalid}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

          </div>
        </Card>
      </Paper>
    </section>
  );
}

export default ProfessionalDashboard;
