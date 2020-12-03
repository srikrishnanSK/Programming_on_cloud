import React, { useEffect, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

const UIDatepicker = (props) => {
  let [value, setValue] = useState(null);
  useEffect(init, [props.value]);
  function init() {
    let date = props.value ? moment(props.value, "DD-MM-YYYY") : null;
    setValue(date);
  }
  function handleInputChange(val) {
    let date = val ? val.format("DD/MM/YYYY") : "";
    props.onChange(date);
  }
  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          label={props.label}
          fullWidth
          format="DD-MM-YYYY"
          required={props.required || false}
          onChange={(value) => handleInputChange(value)}
          value={value}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};
export default UIDatepicker;
