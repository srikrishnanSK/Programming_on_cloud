import { makeStyles } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

export const ToasterStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    width: "300px"
  },
  success: {
    backgroundColor: green[500]
  },
  error: {
    backgroundColor: red[500]
  }
}));

export const useSectionCardStyles = makeStyles((theme) => ({
  cardContainer: {
    marginBottom: theme.spacing(3),
    "& .MuiCardHeader": {
      borderBottom: "1px solid #eee",
      padding: "5px 15px",
      background: "#fbfbfb",
      margin: "1px",
      fontSize: "9px"
    }
  },
  details: {
    padding: "15px",
    display: "flex",
    flexDirection: "column"
  },
  noPadding: {
    padding: "0",
    display: "flex",
    flexDirection: "column"
  },
  w100p: {
    width: "100%"
  },
  panelBg: {
    background: "var(--dash-bg)"
  },
  cardHeader: {
    backgroundColor: "#fafafa",
    padding: "5px 15px",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    minHeight: "0 !important",
    borderBottom: "1px solid #bdbdbd1f",
    "& h6": {
      fontSize: "14px"
    },
    "& button": {
      height: "10px"
    },
    "& > .Mui-expanded": {
      margin: 0
    }
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
    // "& > button": {
    //   opacity: 0,
    //   transition: theme.transitions.create(["opacity"], {
    //     duration: theme.transitions.duration.short,
    //   }),
    // },
    // "&:hover": {
    //   "& > button": {
    //     opacity: 1,
    //   },
    // },
  }
}));
