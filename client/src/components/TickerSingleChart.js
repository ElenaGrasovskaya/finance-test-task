import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend,
} from "@progress/kendo-react-charts";
import { COLORS } from '../constants/styleConstants';
import { ChartContainer } from "../styledComponents/TickerSingleChartStyles"

const TickerSingleChart = (props) => {
    const { tickers, allTickers, selectedTicker } = props;
    let printData = [];


    if (allTickers) {

        tickers.forEach((ticker, index) => {
            printData = [...printData, { color: COLORS[index], name: ticker.ticker, data: allTickers.map(item => { return item.reduce((acc, i) => { if (i.ticker === ticker.ticker) { acc = i.price; return acc } else return acc }, 0) }) }]
        })

    }
    const displayTicker = printData.find((item) => item.name === selectedTicker);

    return (

        <ChartContainer>
            <Chart pannable zoomable height="600px" style={{ height: 2000 }}>
                <ChartTitle>Ticker prices</ChartTitle>

                <ChartLegend position="top" orientation="horizontal" color="black" />
                <ChartValueAxis height="1000px" color="black" >
                    <ChartValueAxisItem title={{ text: displayTicker.name, font: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }} min={0} max={400} color="black" height="800" />
                </ChartValueAxis>
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem />
                </ChartCategoryAxis>
                <ChartSeries>
                    <ChartSeriesItem
                        key={100}
                        type="line"
                        tooltip={{ visible: true }}
                        data={displayTicker.data}
                        name={displayTicker.name}
                        color={displayTicker.color}
                    />

                </ChartSeries>
            </Chart>
        </ChartContainer>



    )


};


export default TickerSingleChart