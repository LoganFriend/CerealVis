import React, { Component } from 'react'

import { CircleSketch } from './CircleSketch'


class P5Circle extends Component {
    constructor() {
        super()
        this.state = {
            prevdata: 100,
            frameRate: null,
            data: 100
        }
    }

    stream = (event, data) => {
        this.setState({prevdata: this.state.data});
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
                    p5Props={{ prevdata: this.state.prevdata, data: this.state.data }}
                    onSetAppState={this.onSetAppState}
                />
            </>
        )
    }
}

export default P5Circle