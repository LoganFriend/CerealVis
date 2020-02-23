import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="#home">IoT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Reports</Nav.Link>
            <NavDropdown title="Chart Type" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Line Chart</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Bar Chart</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Plot Chart</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Help</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
