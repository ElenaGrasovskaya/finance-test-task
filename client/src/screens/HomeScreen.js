import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import { listTickers } from '../actions/tickerActions'
import { IoMdSync } from "react-icons/io";
import TickerDisplay from '../components/TickerDisplay';
import { AiFillCloseCircle } from "react-icons/ai";
import TickerLineChart from '../components/TickerLineChart';
function HomeScreen() {

    const [hideList, setHideList] = useState([]);
    const [refreshInterval, setRefreshInterval] = useState(5000)
    const [updateInterval, setUpdateInterval] = useState(5000);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listTickers());

    }, []);


    /*useEffect(() => {                         I tried to make it update the refresh intrval, but unfortunately could find the solution.
                                                This one causes multiplying dispatch requests.
        const interval = setInterval(() => {
        dispatch(listTickers());
        }, updateInterval);
        return () => {
            clearInterval(interval);
        };
    }, [updateInterval]); */         



    const tickerList = useSelector((state) => state.tickerList);
    const { tickers, loading, error } = tickerList;

   
    const handleHideTicker = (ticker) => {
        const newHideList = new Set([...hideList, ticker]);
        setHideList([...newHideList])
    }

    return (

        <div>
            <StyledHeader>INCODE Finance Controll</StyledHeader>
            {(!loading && !error) ? (<StyledContainer>
                {
                    tickers.map((ticker, index) => (!hideList.find((el) => el === ticker.ticker)) ? (

                        <TickerContainer key={index + 40}><CloseButton key={index + 10} onClick={(e) => handleHideTicker(ticker.ticker)}><AiFillCloseCircle key={index + 30} /></CloseButton>
                            <TickerDisplay ticker={ticker} key={index + 20} /></TickerContainer>) : ("")
                    )
                }

            </StyledContainer>) : (<h2>Loading...</h2>)}

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

            <TickerLineChart ticker={"AAPL"} />
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
font-size: 25px;
height: 25px;
width: 25px;
&:hover {
    color:red;
}

`;

const IntervalForm = styled.form`

display: flex;
flex-direction: row;
justify-content: center;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
gap: 10px;

`;

