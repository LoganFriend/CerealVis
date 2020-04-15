import React, { Component } from 'react'

class FillUpBarSketch extends Component {
  componentDidMount() {
    this.canvas = new window.p5(this.base, 'fillupbarsketch-container');
    this.canvas.props = this.props.p5Props;
  }

  shouldComponentUpdate(nextProps) {
    this.canvas.props = nextProps.p5Props;

    return false;
  }

  componentWillUnmount() {
    this.canvas.remove();
  }

  base = (s) => {
    s.props = {}
    s.onSetAppState = () => {}
  
    var colors = ['#469a2b', '#92d03f', '#f8ee4f', '#ea8430', '#e43321'];
  
    s.setup = function() {
      s.createCanvas(300, 300);
    }
  
    s.draw = function() {
      s.background('white');
  
      s.noStroke();
      s.fill('black');
      s.textSize(32);
      s.textAlign(s.CENTER, s.CENTER);
      s.text('max', s.width / 2, 25);
      s.text('min', s.width / 2, s.height - 25);
  
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
  
      s.stroke('black');
      s.strokeWeight(5);
      s.noFill();
      s.rectMode(s.CENTER);
      s.rect(s.width / 2, s.height / 2, 100, 200);
  
      s.strokeWeight(2);
      s.line(100, 210, 200, 210);
      s.line(100, 170, 200, 170);
      s.line(100, 130, 200, 130);
      s.line(100, 90, 200, 90);
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