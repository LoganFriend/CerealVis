import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Button } from "@material-ui/core";
import { Serial } from "../../components";
import "../Popup/style.css";

class PopUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Popup trigger={<Button className="button"> Open Popup </Button>} modal>
        {close => (
          <div className="modal">
            <a className="close" onClick={close}>
              &times;
            </a>

            <div className="actions">
              <Serial />
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default PopUp;
