import React, { Component } from 'react'

class GameSketch extends Component {
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

    var time = 60;
    var score = 0;
    var xPos = 30;
    var maxFrames = 600;
    var randomX = 0;
    var flag = false;
    var neg = 0;
  
    s.setup = function() {
      s.createCanvas(300, 300);
      s.frameRate(60);
      randomX = s.floor(s.random(60, 285));
    }
  
    s.draw = function() {
      s.background('white');

      s.rectMode(s.CORNER);

      xPos = s.props.data;

      if (xPos < 30) {
        neg++;
      }
      
      if (s.frameCount % 180 === 0) {
        if (flag) {
          flag = false;
        } else {
          randomX = s.floor(s.random(60, 285));
        }
      }

      if (s.frameCount < maxFrames) {
        s.fill('black');
        s.noStroke();
        s.textAlign(s.CENTER, s.CENTER)
        s.textSize(20);
        s.text('Touch the randomly moving\nsquare as many times\n as you can in 60 seconds.', s.width / 2, 50);
        s.textSize(15);
        s.text('Be careful, going behind the red line\ncosts you points when you stay too long\nand the ball moves every 3 seconds\nor when you touch it!', s.width / 2, s.height / 2 - 20);
      }

      if (s.frameCount % 60 === 0 && time > 0) {
        time--;
      }

      if (time > 0) {
        if (s.frameCount % 60 === 0 && neg > 60 & xPos < 30) {
          score--;
        }
        s.fill('blue');
        s.noStroke();
        s.textAlign(s.CENTER, s.CENTER)
        s.textSize(25);
        if (time !== 1) {
          s.text(time + " seconds", s.width / 2, s.height / 2 + 35);
        } else {
          s.text(time + " second", s.width / 2, s.height / 2 + 35);
        }

        s.textSize(22);
        s.fill('black');
        s.textAlign(s.CENTER, s.CENTER);
        s.text("Score: " + score, s.width / 2, s.height - 15);

        s.fill('blue');
        s.noStroke();
        s.rect(xPos, 220, 30, 30);

        s.noStroke();
        s.fill('orange');
        s.rect(randomX, 235, 15, 15);

        if (xPos >= randomX) {
          if (xPos <= (randomX + 15)) {
            score++;
            flag = true;
            if (xPos > 135) {
              randomX = s.floor(s.random(60, 90));
            } else {
              randomX = s.floor(s.random(140, 285))
            }
          }
        } else {
          if (xPos + 30 >= randomX) {
            score++;
            flag = true;
            if (xPos > 135) {
              randomX = s.floor(s.random(60, 90));
            } else {
              randomX = s.floor(s.random(140, 285))
            }
          }
        }

        s.stroke('red');
        s.strokeWeight(2);
        s.line(58, s.height - 50, 58, 200);
        
        s.stroke('black');
        s.strokeWeight(6);
        s.line(0, 250, 300, 250);

        s.textSize(15);
        s.noStroke();
        s.fill('black');
        s.text('min', 20, s.height - 35);
        s.text('max', 280, s.height - 35);
      } else {
        s.noStroke();
        s.textSize(35);
        s.fill('black');
        s.textAlign(s.CENTER, s.CENTER);
        s.text("Final Score: " + score, s.width / 2, s.height / 2 - 25);
        s.fill('blue');
        s.rect(s.width / 2 - 50, s.height / 2, 100, 50);
        s.fill('white');
        s.textSize(30);
        s.text('reset', s.width / 2, s.height / 2 + 25);
      }
    }

    s.mousePressed = function() {
      if (time === 0 && s.mouseX >= 100 && s.mouseX <= 200 && s.mouseY >= 150 && s.mouseY <= 200) {
        time = 60;
        maxFrames = s.frameCount + 600;
        score = 0;
      }
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

export {GameSketch};