import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Circle from './CircleVis'
import Slider from './Slider'

class P5Wrapper extends Component {
    static propTypes = {
        p5Props: PropTypes.object.isRequired,
        onSetAppState: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.canvas1 = new window.p5(Circle, 'canvas1-container')
        this.canvas1.props = this.props.p5Props
        this.canvas1.onSetAppState = this.props.onSetAppState

        this.canvas2 = new window.p5(Slider, 'canvas2-container')
        this.canvas2.props = this.props.p5Props
    }

    shouldComponentUpdate(nextProps) {
        this.canvas1.props = nextProps.p5Props
        this.canvas2.props = nextProps.p5Props
        return false
    }

    componentWillUnmount() {
        this.canvas1.remove()
        this.canvas2.remove()
    }

    render() {
        return (
            <>
                <div
                    id="canvas2-container"
                    style={{ width: "100%", textAlign: "center" }}
                />
                <div
                    id="canvas1-container"
                    style={{ width: "100%", textAlign: "center" }}
                />
            </>
        )
    }
}

class P5 extends Component {
    constructor() {
        super()
        this.state = {
            slider: 100,
            frameRate: null,
        }
    }

    onSetAppState = (newState, cb) => this.setState(newState, cb)

    onSliderChange = (event) => this.setState({ slider: +event.target.value })

    render() {
        return (
            <>
                <P5Wrapper
                    p5Props={{ slider: this.state.slider }}
                    onSetAppState={this.onSetAppState}
                />

                <div style={{ textAlign: 'center' }}>
                    <strong>{this.state.slider}</strong>
                    <br />
                    <input
                        type="range"
                        min={5} max={290} step={1}
                        value={this.state.slider}
                        style={{ width: '90%', maxWidth: '900px' }}
                        onChange={this.onSliderChange}
                    />
                </div>

                <p style={{ textAlign: 'center' }}>
                    Sketch frame rate:&nbsp;
                    <big><strong>{this.state.frameRate}</strong></big>
                    &nbsp;fps
                </p>
            </>
        )
    }
}

export default P5