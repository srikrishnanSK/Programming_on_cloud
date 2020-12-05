import { createMuiTheme } from "@material-ui/core";
import typography from "./typography";

const vars = {
  primary: "#5383ff",
  primaryLight: "#495368",
  primaryDark: "#09142a",
  secondary: "#fff",
  inheritDefault1: "#fefefe",
  inheritDefault2: "#f8f9ff",
  second: "#070919",
  indigo: "#7420ff",
  purple: "#793de6",
  pink: "#fc26a4",
  red: "#f83245",
  orange: "#f4772e",
  yellow: "#ffc926",
  green: "#1bc943",
  teal: "#18e1a5",
  cyan: "#27dcf3"
};
const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: vars.primary
    },
    grey: {
      300: vars.inheritDefault1,
      A100: vars.inheritDefault2
    },
    secondary: {
      main: vars.secondary
    },
    error: {
      main: vars.red
    },
    success: {
      main: vars.green
    },
    warning: {
      main: vars.orange
    },
    helpers: {
      primary: vars.blue,
      main: "rgba(25, 46, 91, .035)"
    },
    contrastThreshold: 3,
    tonalOffset: 0.1
  },
  shape: {
    borderRadius: "0.5rem"
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: "0.875rem",
        textTransform: "none",
        fontWeight: "normal",
        borderRadius: "5px",
        minWidth: "110px"
      },
      containedPrimary: {
        backgroundColor: "#004085"
      },
      outlinedPrimary: {
        borderRadius: "var(--dash-b-radius)"
      },
      textPrimary: {
        background: "#1a2038 !important",
        color: "#fff",
        padding: "6px 16px",
        fontWeight: "bold"
      }
    },
    MuiMenu: {
      paper: {
        minWidth: "150px"
      }
    },
    MuiRadio: {
      root: {
        color: "rgba(0, 0, 0, 0.54) !important"
      },
      colorSecondary: {
        MuiChecked: {
          backgroundColor: "#004085"
        }
      }
    },
    MuiInputBase: {
      ".Mui-disabled": {
        background: "#f9f9f9",
        cursor: "not-allowed"
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: vars.second,
        padding: "8px 16px",
        fontSize: "13px"
      },
      arrow: {
        color: vars.second
      }
    }
  },
  typography
});

export default MuiTheme;
