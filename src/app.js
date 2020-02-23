import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import "./app.css";
import LineChart from "./components/chart";
import SerialButton from "./components/serial";
import NavBar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h3>
          <small className="text-muted m-2">Welcome to your</small>
        </h3>
        <h1 className="display-4 m-2">Arduino Biometric Monitor</h1>
        <SerialButton />
        <Container>
          <Row>
            <LineChart />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
