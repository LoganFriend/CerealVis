import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    saveData: false,
  });

  function saveData() {}

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    // Database commands should be called from here
    saveData();
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedA}
            onChange={handleChange}
            color="primary"
            name="saveData"
          />
        }
        label="Check to save run"
      />
    </FormGroup>
  );
}
