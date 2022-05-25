import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    StyledContainer,
    StyledHeader,
    TickerContainer,
    CloseButton, RefreshButton,
    IntervalForm
} from "../styledComponents/HomeScreenStyles"
import { listTickers } from '../actions/tickerActions'
import { IoMdSync } from "react-icons/io";
import TickerDisplay from '../components/TickerDisplay';
import { AiFillCloseCircle } from "react-icons/ai";
import TickerLineChart from '../components/TickerLineChart';
import TickerCanvasChart from '../components/TickerCanvasChart';

function HomeScreen() {

    const [hideList, setHideList] = useState([]);
    const [refreshInterval, setRefreshInterval] = useState(500)
    const [updateInterval, setUpdateInterval] = useState(500);
    const [counter, setCounter] = useState(false);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listTickers(true));
        return () => {
        dispatch(listTickers(false));
        }

    }, [])

    dispatch(listTickers(false));

    const tickerList = useSelector((state) => state.tickerList);
    const { tickers, loading, error, allTickers } = tickerList;


    useEffect(() => {

        const interval = setInterval(() => {
            dispatch(listTickers(true));
        }, updateInterval);

        return () => {
            clearInterval(interval);
            dispatch(listTickers(false));
        }

    }, [updateInterval]);

    



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
            

           
            
        </div>

    )
}

export default HomeScreen

/*<TickerCanvasChart />

{(!loading && !error) ? <TickerLineChart tickers={tickers} loading={loading} error={error} allTickers={allTickers} /> : (<h2>Loading...</h2>)}
*/


