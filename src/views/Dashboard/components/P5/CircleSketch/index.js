import React, { Component } from 'react'
import PropTypes from 'prop-types'


function base(s) {
    s.props = {}
    s.onSetAppState = () => {}

    s.setup = function() {
        s.createCanvas(300, 300)
    }

    s.draw = function() {
        if (s.frameCount % 60 === 1) {
            s.onSetAppState({ frameRate: s.frameRate().toFixed(1) })
        }

        s.background(255, 255, 255)
        const weight = s.map(s.props.slider, 5, 290, 0, 8)
        s.strokeWeight(weight)
        s.stroke(2, 169, 244)
        const alpha = s.map(s.props.slider, 5, 290, 255, 0)
        s.fill(3, 169, 244, alpha)
        s.ellipse(s.width / 2, s.height / 2, s.props.slider * 2)
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