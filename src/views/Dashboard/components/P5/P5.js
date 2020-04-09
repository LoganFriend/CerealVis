import React, { Component } from 'react'

import { CircleSketch } from './CircleSketch'


class P5 extends Component {
    constructor() {
        super()
        this.state = {
            data: 100,
            frameRate: null,
        }
    }

    stream = (event, data) => {
        this.setState({ data: Math.floor(data / 1024 * 100)});
    }

    componentDidMount() {
        window.ipcRenderer.on("datastream", this.stream);
    }

    componentWillUnmount() {
        window.ipcRenderer.removeListener("datastream", this.stream);
    }

    onSetAppState = (newState, cb) => this.setState(newState, cb)

    render() {
        return (
            <>
                <CircleSketch
                    p5Props={{ slider: this.state.data }}
                    onSetAppState={this.onSetAppState}
                />
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