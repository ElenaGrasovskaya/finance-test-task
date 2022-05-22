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
import { COLORS } from '../constants/tickerConstants';
import { listTickers } from '../actions/tickerActions'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'



const TickerLineChart = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listTickers());

    }, [dispatch]);

    const tickerList = useSelector((state) => state.tickerList);
    const { tickers, allTickers, loading, error } = tickerList;
    let printData = [];


    if (!loading && !error && allTickers) {

        tickers.forEach((ticker, index) => {
            printData = [...printData, { color: COLORS[index], name: ticker.ticker, data: allTickers.map(item => { return item.reduce((acc, i) => { if (i.ticker === ticker.ticker) { acc = i.price; return acc } else return acc }, 0) }) }]
        })

    }


    const categories = tickers.map((item) => item.ticker);
    return (
        <Chart pannable zoomable style={{ height: 2000 }}>

            <ChartLegend position="top" orientation="horizontal" color="black" />
            <ChartValueAxis height="1000px" color="black" >
                <ChartValueAxisItem title={{ text: "Ticker price" }} min={0} max={500} color="black" height="800" />
            </ChartValueAxis>
            <ChartCategoryAxis>
                <ChartCategoryAxisItem />
            </ChartCategoryAxis>
            <ChartSeries>
                {printData.map((item, idx) => (
                    <ChartSeriesItem
                        key={idx}
                        type="line"
                        tooltip={{ visible: true }}
                        data={item.data}
                        name={item.name}
                        color={item.color}
                    />
                ))}
            </ChartSeries>
        </Chart>
    );
};


export default TickerLineChart