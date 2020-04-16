import React, { Component } from 'react'
import PropTypes from 'prop-types'


function base(s) {
    s.props = {}
    s.onSetAppState = () => {}

    //linear interpolation calculation
    var lerp;

    //background sizing with added scalar
    var bx;
    var by;

    s.setup = function() {
        bx = s.windowWidth/2
        by = s.windowHeight/2

        s.createCanvas(bx,by)

        //set initial value
        lerp = s.props.data;
    }

    s.draw = function() {

        //in case initial lerp value is null
        if (isNaN(lerp)) lerp = s.props.prevdata;
        
        lerp = s.lerp(lerp, s.props.data, 0.1)

        //background
        s.background(255)
        s.stroke(0)
        s.fill(0)

        //top 100 line
        s.strokeWeight(2)
        s.line(bx * .15, by * .2, bx * .85, by * .2)
        //top 50 line
        s.strokeWeight(1)
        s.line(bx * .15, by * .35, bx * .85, by * .35)
        //mid line
        s.strokeWeight(.5)
        s.line(bx * .15, by * .5, bx * .85, by * .5)
        //bot 50 line
        s.strokeWeight(1)
        s.line(bx * .15, by * .65, bx * .85, by * .65)
        //bot 100 line
        s.strokeWeight(2)
        s.line(bx * .15, by * .8, bx * .85, by * .8)
        
        //text
        s.strokeWeight(0)
        s.textSize(16)
        s.textAlign('RIGHT', 'CENTER')
        s.text('100%', bx * .05, by * .2 + 7)
        s.text('50%', bx * .05, by * .35 + 7)
        s.text('0%', bx * .05, by * .5 + 7)
        s.text('50%', bx * .05, by * .65 + 7)
        s.text('100%', bx * .05, by * .8 + 7)


        const weight = s.map(s.props.data, 5, 290, 0, 8)
        s.strokeWeight(weight)
        s.stroke(2, 169, 244)
        const alpha = s.map(s.props.data, 5, 290, 255, 150)
        s.fill(3, 169, 244, alpha)

        s.ellipse(s.width / 2, s.height / 2, lerp / 100 * by * 0.6)

    }

    s.windowResized = function() {
        bx = s.windowWidth/2
        by = s.windowHeight/2
        s.resizeCanvas(bx,by)
    }
}


class CircleSketch extends Component {
    static propTypes = {
        p5Props: PropTypes.object.isRequired,
        onSetAppState: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.canvas = new window.p5(base, 'circlesketch-container')
        this.canvas.props = this.props.p5Props
        this.canvas.onSetAppState = this.props.onSetAppState
    }

    shouldComponentUpdate(nextProps) {
        this.canvas.props = nextProps.p5Props

        return false
    }

    componentWillUnmount() {
        this.canvas.remove()
    }

    render() {
        return (
            <>
                <div
                    id="circlesketch-container"
                    style={{ width: "100%", textAlign: "center" }}
                />
            </>
        )
    }
}

export {CircleSketch}