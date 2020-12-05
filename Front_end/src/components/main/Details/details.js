import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Axios from "axios";
import { Button } from "@material-ui/core";
import "./details.scss";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "react-datepicker";
import { Auth } from "aws-amplify";
import { CircularProgress } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    
    "& > .form-input": {
      margin: theme.spacing(1),
      width: "33.33%",
    },
    "&>button": {
      width: "200px",
      height: "50px",
      margin: "auto",
    },
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
  card: {
    width: 400,
    margin: "auto",
    transition: "0.3s",
    border: " 1px solid #dadada",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.0)",
    },
  },
  media: {
    paddingTop: "100%",
  },
  content: {
    textAlign: "left",
    padding: "5px 15px 15px 15px",
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
const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "red"
    }
  }
});

export default function Servicedetails(props) {
  const classes = useStyles();
  const { state } = useLocation();
  const [isShowLoader, setisShowLoader] = useState(false);
  const history = useHistory();

  const [startDate, setStartDate] = useState(new Date());
  const [Appointment] = useState({
    appointmentID: "",
    appointmentDate: "",
    appointmentTime: "",
    professonalId: "",
    userId: "",
    appointmentStatus: "Pending",
    appointmentInfo: "Pending",
    appointmentCheckIn: "No",
    requserName: "NA",
    requserAddr: "NA",
  });
  Auth.currentUserInfo().then((userInfo) => {
    const { attributes = {} } = userInfo;
    Appointment.userId = attributes["sub"];
  });
  const [Slot, setSlot] = useState("8:00a.m to 9.00 a.m");

  const service = data.services.find(
    (x) => x.firstName === props.match.params.firstName
  );
  const Post = () => {
    Appointment.appointmentID = "app-id" + Math.random(1) * 8;
    Appointment.appointmentDate = startDate.toLocaleDateString();
    Appointment.appointmentTime = Slot;
    Appointment.professonalId = service.professionalid;
    console.log(Appointment);
    setisShowLoader(true);
    Axios.post(
      "https://coen-proj-be.ue.r.appspot.com/makeAppointment",
      Appointment
    )
      .then(function (response) {
        console.log(response);
        setisShowLoader(false);
      })
      .catch(function (error) {
        console.log(error);
        setisShowLoader(false);
      });
  };
  function goBack() {
    history.push({
      pathname: "/dashboard/search-results",
      state: { ...state },
    });
  }
  return (
    <div>
      <div className="Back-to-results">
        <Button
          size="small"
          variant="contained"
          align="right"
          color="secondary"
          onClick={goBack}
        >
          Back to Results
        </Button>
      </div>
      <div className="details">
        <img width="300" height="300" src={service.image} alt="service"></img>
        <div className="card-details">
          <Card className={classes.card}>
            <CardContent
              className={classes.content}
              style={{ justifyContent: "center" }}
            >
              <Typography
                className={"MuiTypography--heading"}
                variant={"h5"}
                align={"left"}
                gutterBottom
              >
                Name : {service.firstName} {service.lastName}
              </Typography>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h5"}
                align={"left"}
                gutterBottom
              >
                Primary Service: {service.primarySkill}
              </Typography>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h5"}
                align={"left"}
                gutterBottom
              >
                Secondary Service: {service.secondarySkill}
              </Typography>

              <Typography
                className={"MuiTypography--heading"}
                variant={"h5"}
                align={"left"}
                gutterBottom
              >
                Work Availibility: Available
              </Typography>
              <Typography
                className={"MuiTypography--subheading"}
                variant={"h5"}
                align={"left"}
              >
                Gender : {service.gender}
              </Typography>
              <br></br>

              <Typography
                className={"MuiTypography--subheading"}
                variant={"h6"}
                align={"left"}
              >
                Total Years of Experience: {service.experience}
              </Typography>
              <Typography
                className={"MuiTypography--subheading"}
                variant={"h6"}
                align={"left"}
                fontStyle="italic"
              >
                Id.No: {service.professionalid}
              </Typography>
              <br></br>

              <Typography
                className={"MuiTypography--subheading"}
                variant={"h6"}
                align={"left"}
              >
                Little about myself: {service.description}
              </Typography>
              <Divider className={classes.divider} light />
              <Typography
                className={"MuiTypography--subheading"}
                variant={"h6"}
                align={"right"}
              >
                Cost Per Hour:{service.payPerhr}
              </Typography>
              <br></br>
              <Typography
                className={"MuiTypography--subheading"}
                variant={"h6"}
                align={"right"}
              >
                Select Date{" "}
                <DatePicker
                  minDate={new Date()}
                  selected={startDate}
                  onChange={(e) => {
                    setStartDate(e);
                  }}
                  isClearable
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Select a day"
                />
              </Typography>
              <br></br>

              <Typography
                className={"MuiTypography--subheading"}
                variant={"h6"}
                align={"right"}
              >
                Time Slot:{" "}
                <select
                  value={Slot}
                  onChange={(e) => {
                    setSlot(e.target.value);
                  }}
                >
                  <option>8:00a.m to 9.00 a.m</option>
                  <option>9:00a.m to 10.00 a.m</option>
                  <option>10:00a.m to 11.00 a.m</option>
                  <option>11:00a.m to 12.00 p.m</option>
                  <option>12:00p.m to 1.00 p.m</option>
                  <option>1:00p.m to 2.00 p.m</option>
                  <option>2:00p.m to 3.00 p.m</option>
                  <option>3:00p.m to 4.00 p.m</option>
                  <option>4:00p.m to 5.00 p.m</option>
                </select>
              </Typography>
              <br></br>

              <Button
                
                onClick={Post}
                disabled={isShowLoader}
                style={{
                  size:"large",
                  variant:"contained",
                  align:"right",
                  backgroundColor:' #c6d7eb'
                }}
                variant="contained"
                
              >
                Request an appointment
              </Button>
              {isShowLoader && (
                <CircularProgress size={24} className="buttonProgress" />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
