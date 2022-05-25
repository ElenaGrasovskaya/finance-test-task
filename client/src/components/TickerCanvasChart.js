import React, { useEffect, useState } from "react";
import CanvasJSReact from '../canvas/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


const TickerCanvasChart = (props) => {
    const [state, setState] = useState({})
    useEffect(() => {
        {
            //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
            fetch("https://canvasjs.com/data/gallery/react/btcusd2017-18.json")
                .then(res => res.json())
                .then(
                    (data) => {
                        var dps = [];
                        for (var i = 0; i < data.length; i++) {
                            dps.push({
                                x: new Date(data[i].date),
                                y: Number(data[i].close)
                            });
                        }
                        setState({
                            isLoaded: true,
                            dataPoints: dps
                        });
                    }
                )
        }
    }, [])

    console.log("state", state);



    const options = {
        title: {
            text: "React StockChart with Spline Area Chart"
        },
        theme: "light2",
        subtitles: [{
            text: "BTC/USD"
        }],
        charts: [{
            axisX: {
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    valueFormatString: "MMM DD YYYY"
                }
            },
            axisY: {
                title: "Bitcoin Price",
                prefix: "$",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    valueFormatString: "$#,###.##"
                }
            },
            toolTip: {
                shared: true
            },
            data: [{
                name: "Price (in USD)",
                type: "splineArea",
                color: "#3576a8",
                yValueFormatString: "$#,###.##",
                xValueFormatString: "MMM DD YYYY",
                dataPoints: state.dataPoints
            }]
        }],
        navigator: {
            slider: {
                minimum: new Date("2017-05-01"),
                maximum: new Date("2018-05-01")
            }
        }
    };
    const containerProps = {
        width: "100%",
        height: "450px",
        margin: "auto"
    };
    return (
        <div>
            <div>
                {
                    // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
                    state.isLoaded &&
                    <CanvasJSStockChart containerProps={containerProps} options={options}
                    /* onRef = {ref => this.chart = ref} */
                    />
                }
            </div>
        </div>
    );

}

export default TickerCanvasChart;             