import React, { Component } from 'react'

import { CircleSketch } from './CircleSketch'

class P5 extends Component {
    constructor() {
        super()
        this.state = {
            data: 100,
            frameRate: null,
        }

        window.ipcRenderer.on("datastream", (event, arg) => {
            
            this.setState({ data: Math.floor(arg / 1024 * 100)});

          });
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