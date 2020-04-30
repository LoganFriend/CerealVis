import React, { Component } from "react";

/*
The GameSketch React Class displays and allows the unser to interact with the P5 game.

componentDidMount => called automatically when react first renders this component, creates the p5 canvas
shouldComponentUpdate => a react function, checks to see if the component should be re-rendered
componentWillUnmount => called automatically when react no longer renders this component, removes the canva
base => this function is the actual implementation of the p5 code, creates the fill up bar
 */

class GameSketch extends Component {
  // componentDidMount is automatically called when react renders this prop
  componentDidMount() {
    // creates a new canvas and sets the props
    this.canvas = new window.p5(this.base, "fillupbarsketch-container");
    this.canvas.props = this.props.p5Props;
  }

  // shouldComponentUpdate is automatically called when react decides if an update is needed or not
  shouldComponentUpdate(nextProps) {
    this.canvas.props = nextProps.p5Props;
    return false;
  }

  // componentWillUnmount is automatically called when react is no longer rendering this component
  componentWillUnmount() {
    this.canvas.remove();
  }

  // base is the p5 sketch that is executed
  base = (s) => {
    // creates and initializes variables
    s.props = {};
    s.onSetAppState = () => {};
    var time = 60;
    var score = 0;
    var xPos = 30;
    var maxFrames = 600;
    var randomX = 0;
    var flag = false;
    var neg = 0;
    var start = false;

    // the setup function creates the first instance of the canvas
    s.setup = function () {
      s.createCanvas(300, 300);
      s.frameRate(60);
      randomX = s.floor(s.random(60, 285));
    };

    // the draw functions "draws" all of the specified elements on the canvas
    s.draw = function () {
      s.background("white");

      // true when the start button has not been pressed
      if (!start) {
        // sets the warning text
        s.textAlign(s.CENTER, s.CENTER);
        s.textSize(22);
        s.fill("black");
        s.text(
          "Make sure you have started\nthe data flow before playing.",
          s.width / 2,
          80
        );

        // creates the "start" button and displays the start text
        s.fill("blue");
        s.rect(s.width / 2 - 50, s.height / 2, 100, 50);
        s.fill("white");
        s.textSize(30);
        s.text("Start", s.width / 2, s.height / 2 + 27);
        maxFrames = s.frameCount + 600;
        return;
      }

      // sets the rect mode and updates the current value given by the connected device
      s.rectMode(s.CORNER);
      xPos = s.props.data;

      // flags when the user is not moving enough
      if (xPos < 30) {
        neg++;
      }

      // true every 3 seconds
      // this if statement moves the box the user is trying to hit
      if (s.frameCount % 180 === 0) {
        if (flag) {
          flag = false;
        } else {
          randomX = s.floor(s.random(60, 285));
        }
      }

      // true for the first 10 seconds of the program starting
      // this if statement displays the "rules" of the game
      if (s.frameCount < maxFrames) {
        s.fill("black");
        s.noStroke();
        s.textAlign(s.CENTER, s.CENTER);
        s.textSize(20);
        s.text(
          "Touch the randomly moving\nsquare as many times\n as you can in 60 seconds.",
          s.width / 2,
          50
        );
        s.textSize(15);
        s.text(
          "Be careful, going behind the red line\ncosts you points when you stay too long\nand the ball moves every 3 seconds\nor when you touch it!",
          s.width / 2,
          s.height / 2 - 20
        );
      }

      // true every second
      // this if statement decreases the timer
      if (s.frameCount % 60 === 0 && time > 0) {
        time--;
      }

      // true while there is still time left
      if (time > 0) {
        // determines if the user should lose a point for not moving enough
        if (neg >= 60 && xPos < 30) {
          neg = 0;
          score--;
        }

        var t = Math.abs(neg - 60); // sets the penalty text value

        // draws the penalty text
        s.text(t, 20, 205);

        // formats and draws the timer text
        s.fill("blue");
        s.noStroke();
        s.textAlign(s.CENTER, s.CENTER);
        s.textSize(25);
        if (time !== 1) {
          s.text(time + " seconds", s.width / 2, s.height / 2 + 35);
        } else {
          s.text(time + " second", s.width / 2, s.height / 2 + 35);
        }

        // formats and draws the scoreboard text
        s.textSize(22);
        s.fill("black");
        s.textAlign(s.CENTER, s.CENTER);
        s.text("Score: " + score, s.width / 2, s.height - 15);

        // formats and draws the playable character
        s.fill("blue");
        s.noStroke();
        s.rect(xPos, 220, 30, 30);

        // formats and draws the object the player is trying to hit
        s.noStroke();
        s.fill("orange");
        s.rect(randomX, 235, 15, 15);

        // determines the collision between the player and the object
        if (xPos >= randomX) {
          if (xPos <= randomX + 15) {
            score++;
            flag = true;
            if (xPos > 135) {
              // sets the new goal position away from the user
              randomX = s.floor(s.random(60, 90));
            } else {
              randomX = s.floor(s.random(140, 285));
            }
          }
        } else {
          if (xPos + 30 >= randomX) {
            score++;
            flag = true;
            if (xPos > 135) {
              // sets the new goal position away from the user
              randomX = s.floor(s.random(60, 90));
            } else {
              randomX = s.floor(s.random(140, 285));
            }
          }
        }

        // draws the inactivity zone warning bar
        s.stroke("red");
        s.strokeWeight(2);
        s.line(58, s.height - 50, 58, 200);

        // draws the floor everything is grounded to
        s.stroke("black");
        s.strokeWeight(6);
        s.line(0, 250, 300, 250);

        // draws the min and max value indicators
        s.textSize(15);
        s.noStroke();
        s.fill("black");
        s.text("min", 20, s.height - 35);
        s.text("max", 280, s.height - 35);
      } else {
        // used when the game has ended
        // formats and draws the final score
        s.noStroke();
        s.textSize(35);
        s.fill("black");
        s.textAlign(s.CENTER, s.CENTER);
        s.text("Final Score: " + score, s.width / 2, s.height / 2 - 25);

        // formats and draws the reset button and reset text
        s.fill("blue");
        s.rect(s.width / 2 - 50, s.height / 2, 100, 50);
        s.fill("white");
        s.textSize(30);
        s.text("reset", s.width / 2, s.height / 2 + 25);
      }
    };

    // this function is an action listener that listens for mouse clicks
    s.mousePressed = function () {
      // true when the game is over
      // this if statement serves as a listener for the restart button
      if (
        time === 0 &&
        s.mouseX >= 100 &&
        s.mouseX <= 200 &&
        s.mouseY >= 150 &&
        s.mouseY <= 200
      ) {
        time = 60;
        maxFrames = s.frameCount + 600;
        score = 0;
      }

      // true when the game has not started yet
      // this if statement serves as a listener for the start button
      if (
        !start &&
        s.mouseX >= 100 &&
        s.mouseX <= 200 &&
        s.mouseY >= 150 &&
        s.mouseY <= 200
      ) {
        start = true;
      }
    };
  };

  render() {
    return (
      <div
        id="fillupbarsketch-container"
        style={{ width: "100%", textAlign: "center" }}
      />
    );
  }
}

export { GameSketch };
