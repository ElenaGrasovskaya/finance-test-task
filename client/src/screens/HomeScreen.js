import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import { listTickers } from '../actions/tickerActions'
import { IoMdSync } from "react-icons/io";
import TickerDisplay from '../components/TickerDisplay';
import { AiFillCloseCircle } from "react-icons/ai";

import { IconName } from "react-icons/io";
function HomeScreen() {

    const [hideList, setHideList] = useState([]);
    const [refreshInterval, setRefreshInterval] = useState(5000)
    const [updateInterval, setUpdateInterval] = useState(5000);
    const [counter, setCounter] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {

        const interval = setInterval(() => {

            setCounter(!counter);
            console.log(counter);
        }, updateInterval);

        dispatch(listTickers());

        return () => {
            clearInterval(interval);
        };


    }, [updateInterval, counter, hideList]);



    const tickerList = useSelector((state) => state.tickerList);
    const { tickers, loading, error } = tickerList;



    const handleHideTicker = (ticker) => {
        const newHideList = new Set([...hideList, ticker]);
        setHideList([...newHideList])
    }

    return (

        <div>
            <StyledHeader>INCODE Finance Controll</StyledHeader>
            <StyledContainer>
                {
                    tickers.map((ticker, index) => (!hideList.find((el) => el === ticker.ticker)) ? (

                        <TickerContainer key={index + 40}><CloseButton key={index + 10} onClick={(e) => handleHideTicker(ticker.ticker)}><AiFillCloseCircle key={index + 30} /></CloseButton>
                            <TickerDisplay ticker={ticker} key={index + 20} /></TickerContainer>) : ("")
                    )
                }

            </StyledContainer>
            <RefreshButton onClick={(e) => { e.preventDefault(); setHideList([]) }}><IoMdSync /></RefreshButton>
            <form onSubmit={(e) => {
                e.preventDefault();
                setUpdateInterval({ updateInterval: +refreshInterval + updateInterval });
                console.log("updateInterval", updateInterval);
            }}>
                <label htmlFor='interval'>Set new refresh interval: </label>
                <input
                    type="number"
                    value={refreshInterval}
                    onChange={(e) => {

                        setRefreshInterval(Number(e.target.value))
                    }}
                    name="interval"
                    id="interval"
                ></input>

                <button type="submit">Apply
                </button>
            </form>
        </div>

    )
}

export default HomeScreen

const StyledContainer = styled.div`
 display: flex;
 flex-direction: row;
 gap: 20px;
 justify-content: center;
 padding: 20px 5%;
 flex-wrap: wrap;
 
 `;

const StyledHeader = styled.h1`
text-align: center;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const TickerContainer = styled.a`
border: 0;
text-decoration: none;
`;

const CloseButton = styled.button`

border: none;
background-color: transparent;
text-align: right;
color: darkred;
font-size: 16px;
&:hover {
    color:red;
}

`;

const RefreshButton = styled.button`

border: none;
background-color: transparent;
text-align: right;
color: darkred;
font-size: 30px;
&:hover {
    color:red;
}

`;

//(e, ticker) => handleHideTicker(e, ticker)