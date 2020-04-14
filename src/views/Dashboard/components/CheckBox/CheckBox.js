import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    saveData: false,
  });

  function saveData() {
    var args = {};
    args.cmd = "switch";
    window.ipcRenderer.send("checkbox", args);
  }

  const handleChange = (event) => {
    saveData();
    setState({ ...state, [event.target.name]: event.target.checked });
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
        label="Save Device Data"
      />
    </FormGroup>
  );
}
