import React, { Component } from 'react'

/*
The FillUpBarSketch React Class displays displays the fill up bar and changes
this display based on the live data read in from the connected device.

componentDidMount => called automatically when react first renders this component, creates the p5 canvas
shouldComponentUpdate => a react function, checks to see if the component should be re-rendered
componentWillUnmount => called automatically when react no longer renders this component, removes the canva
base => this function is the actual implementation of the p5 code, creates the fill up bar
 */

class FillUpBarSketch extends Component {
  // componentDidMount is automatically called when react renders this prop
  componentDidMount() {
    // creates a new canvas and sets the props
    this.canvas = new window.p5(this.base, 'fillupbarsketch-container');
    this.canvas.props = this.props.p5Props;
  }

  // shouldComponentUpdate is automatically called when react decides if an update is needed or not
  shouldComponentUpdate(nextProps) {
    this.canvas.props = nextProps.p5Props;
    return false;
  }

  // componentWillUnmount is automatically called when react is no longer rendering this componenet
  componentWillUnmount() {
    this.canvas.remove();
  }

  // base is the p5 sketch that is executed
  base = (s) => {
    // creates and initializes variables
    s.props = {}
    s.onSetAppState = () => {}
    var colors = ['#469a2b', '#92d03f', '#f8ee4f', '#ea8430', '#e43321'];

    // the setup function creates the first instance of the canvas
    s.setup = function() {
      s.createCanvas(300, 300);
    }

    // the draw functions "draws" all of the specified elements on the canvas
    s.draw = function() {
      s.background('white'); // sets background color

      // sets the max and min text
      s.noStroke();
      s.fill('black');
      s.textSize(32);
      s.textAlign(s.CENTER, s.CENTER);
      s.text('max', s.width / 2, 25);
      s.text('min', s.width / 2, s.height - 25);

      // draws the actual fill up bar and choose the correct color
      s.noStroke();
      if (s.props.data > 160) {
        s.fill(colors[4]);
      } else if (s.props.data > 120) {
        s.fill(colors[3]);
      } else if (s.props.data > 80) {
        s.fill(colors[2]);
      } else if (s.props.data > 40) {
        s.fill(colors[1]);
      } else {
        s.fill(colors[0]);
      }
      s.rectMode(s.CORNER);
      s.rect(s.width / 2 + 50, s.height / 2 + 100, -100, -1 * s.props.data);

      // creates the black outline box that "holds" the fill up bar
      s.stroke('black');
      s.strokeWeight(5);
      s.noFill();
      s.rectMode(s.CENTER);
      s.rect(s.width / 2, s.height / 2, 100, 200);

      // sets the percentage numbers
      s.noStroke();
      s.textSize(16);
      s.fill('black');
      s.text("20%", 25, 211);
      s.text("40%", 25, 171);
      s.text("60%", 25, 131);
      s.text("80%", 25, 91);

      // sets the lines that represent every 20%
      s.stroke('black');
      s.strokeWeight(2);
      s.line(50, 210, 200, 210);
      s.line(50, 170, 200, 170);
      s.line(50, 130, 200, 130);
      s.line(50, 90, 200, 90);
    }
  }

  render() {
    return (
      <div
        id="fillupbarsketch-container"
        style={{ width: "100%", textAlign: "center" }}
      />
    );
  }
}

export {FillUpBarSketch};