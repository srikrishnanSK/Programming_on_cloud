import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./search-results.scss";
import { getAllProfileBySearch } from "api/profileApi";
import { useHistory, useLocation } from "react-router-dom";

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
      marginLeft: "auto",
      marginTop: "8px",
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
    maxWidth: 300,
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

function SearchResult(props) {
  const history = useHistory();
  const { state } = useLocation();
  const classes = useStyles();
  const [searchVal, setSearchVal] = useState();
  const [searchResults, setsearchResults] = useState([]);

  useEffect(init, []);
  function init() {
    if (
      props.location.state &&
      props.location.state.from &&
      props.location.state.from.state &&
      props.location.state.from.state.searchValue
    ) {
      setSearchVal(props.location.state.from.state.searchValue);
      onSubmit(props.location.state.from.state.searchValue);
    }
  }
  const onchange = (event) => {
    event.preventDefault();
    setSearchVal(event.target.value);
  };

  const onSubmit = (value) => {
    if (value) {
      const params = new URLSearchParams({
        searchString: value,
      }).toString();
      getAllProfileBySearch(params).then((res) => {
        setsearchResults(res.data.hits.hits);
        console.log(res.data.hits.hits);
      });
    }
  };
  const routeChange = (Path) => {
    history.push({
      pathname: Path,
      state: { searchValue: searchVal },
    });
  };

  return (
    <>
      <div className="search-results">
        <Card className={classes.header}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Type of service"
              variant="outlined"
              className="form-input"
              value={searchVal}
              onChange={onchange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSubmit(searchVal)}
            >
              Search
            </Button>
          </form>
        </Card>
        <Card className={classes.root}>
          <div className={classes.results}>
            <Grid container spacing={3}>
              {searchResults.map((result) => {
                return (
                  <Grid item xs={3}>
                    <Card
                      className={classes.card}
                      key={result._source.firstName}
                    >
                      <CardMedia
                        className={classes.media}
                        image="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                      />
                      <CardContent
                        className={classes.content}
                        style={{ justifyContent: "center" }}
                      >
                        <Typography
                          className={"MuiTypography--heading"}
                          variant={"h5"}
                          align={"center"}
                          gutterBottom
                        >
                          {result._source.firstName}
                        </Typography>
                        <Typography
                          className={"MuiTypography--heading"}
                          variant={"h5"}
                          align={"center"}
                          gutterBottom
                        >
                          {result._source.lastName}
                        </Typography>
                        <Typography
                          className={"MuiTypography--subheading"}
                          variant={"subtitle1"}
                          align={"center"}
                        >
                          {result._source.gender}
                        </Typography>
                        <Typography
                          className={"MuiTypography--subheading"}
                          variant={"h6"}
                          align={"center"}
                        >
                          {result._source.primarySkill}
                        </Typography>
                        <Typography
                          className={"MuiTypography--subheading"}
                          variant={"h6"}
                          align={"center"}
                        >
                          {result._source.experience} years experience
                        </Typography>
                        <Typography
                          className={"MuiTypography--subheading"}
                          variant={"h6"}
                          align={"center"}
                        >
                          $ {result._source.payPerhr} per hour
                        </Typography>
                        <Divider className={classes.divider} light />
                        <div className="text-center">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              routeChange(
                                "/user/service/" + result._source.firstName
                              )
                            }
                          >
                            Click for further details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Card>
      </div>
    </>
  );
}
export default SearchResult;
