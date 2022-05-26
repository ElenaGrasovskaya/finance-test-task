import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    StyledContainer,
    StyledHeader,
    TickerContainer,
    CloseButton, RefreshButton,
    IntervalForm,
    TickerDisplayButton
} from "../styledComponents/HomeScreenStyles"
import { listTickers } from '../actions/tickerActions'
import { IoMdSync } from "react-icons/io";
import TickerDisplay from '../components/TickerDisplay';
import { AiFillCloseCircle } from "react-icons/ai";
import { displayTickersTemplate } from '../constants/tickerConstants';
import TickerSingleChart from "../components/TickerSingleChart";


function HomeScreen() {

    const [hideList, setHideList] = useState([]);
    const [selectedTicker, setSelectedTicker] = useState("AAPL");
    const [refreshInterval, setRefreshInterval] = useState(5000)
    const [updateInterval, setUpdateInterval] = useState(5000);
    const [displayTickers, setDisplayTickers] = useState([...displayTickersTemplate])

    const dispatch = useDispatch();
    const tickerList = useSelector((state) => state.tickerList);
    const { tickers, loading, error, allTickers } = tickerList;


    
    useEffect(() => {
        dispatch(listTickers(true));
        
        const interval = setInterval(() => {
      
            setDisplayTickers(tickers);
            
        }, updateInterval);

        return () => {
            dispatch(listTickers(false));
            clearInterval(interval);
        }

    }, [updateInterval, displayTickers, dispatch]);


    

    const handleHideTicker = (ticker) => {
        const newHideList = new Set([...hideList, ticker]);
        setHideList([...newHideList])
    }

    const handleSelectTicker = (ticker) => {
        console.log(ticker);
        setSelectedTicker(ticker);
    }

    return (

        <div>
            <StyledHeader>INCODE Finance Controll</StyledHeader>
            {(!loading && !error) ? (<StyledContainer>
                {
                    tickers.map((ticker, index) => (!hideList.find((el) => el === ticker.ticker)) ? (

                        <TickerContainer key={index + 40}><CloseButton key={index + 10} onClick={(e) => handleHideTicker(ticker.ticker)}><AiFillCloseCircle key={index + 30} /></CloseButton>
                            <TickerDisplayButton onClick={(e)=>{handleSelectTicker(ticker.ticker)}}><TickerDisplay ticker={ticker} key={index + 20} /></TickerDisplayButton></TickerContainer>) : ("")
                    )
                }

            </StyledContainer>) : (<StyledContainer>
                {
                    displayTickersTemplate.map((ticker, index) => (!hideList.find((el) => el === ticker.ticker)) ? (

                        <TickerContainer key={index + 40}><CloseButton key={index + 10} onClick={(e) => handleHideTicker(ticker.ticker)}><AiFillCloseCircle key={index + 30} /></CloseButton>
                            <TickerDisplayButton onClick={(e)=>{handleSelectTicker(ticker.ticker)}}><TickerDisplay ticker={ticker} key={index + 20} /></TickerDisplayButton></TickerContainer>) : ("")
                    )
                }

            </StyledContainer>)}

            <IntervalForm onSubmit={(e) => {
                e.preventDefault();

                setUpdateInterval(refreshInterval);

            }}>
                <RefreshButton onClick={(e) => { e.preventDefault(); setHideList([]); }}><IoMdSync /></RefreshButton>
                <label htmlFor='interval'>Set new refresh interval: </label>
                <input
                    type="number"
                    value={refreshInterval}
                    onChange={(e) => {
                        setRefreshInterval(Number(e.target.value));
                    }}
                    name="interval"
                    id="interval"
                ></input>

                <button type="submit">Apply
                </button>
            </IntervalForm>
            <TickerSingleChart tickers={displayTickersTemplate} allTickers={allTickers} selectedTicker = {selectedTicker} />


        </div>

    )
}

export default HomeScreen

/*
 {(!loading && !error) ? <TickerLineChart tickers={tickers} loading={loading} error={error} allTickers={allTickers} /> : (<h2>Loading...</h2>)}


*/


