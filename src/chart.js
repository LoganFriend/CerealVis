import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";

class Chart extends React.Component {
    
    constructor(props){
        super(props);
        this.chart = <Line data={props.data} options={props.options} />;
    }

    render() {
        return (
            this.chart
        )
    }
}


export default Chart;

