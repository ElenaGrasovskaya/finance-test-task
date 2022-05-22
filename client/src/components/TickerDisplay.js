import React from 'react';
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import { BsArrowDownSquareFill } from "react-icons/bs";
import { BsArrowUpSquareFill } from "react-icons/bs";

function TickerDisplay(ticker) {
  const display = ticker.ticker;
  return (
    <TickerContainer>
      <StyledIcon mainColor={(Number(display.change) > 150)}>{(Number(display.change) > 150) ? <BsArrowUpSquareFill /> : <BsArrowDownSquareFill />}</StyledIcon>
      <StyledBlock><TickerName>{display.ticker}</TickerName><div>{display.price}</div></StyledBlock>
      <StyledBlockLast><p>{display.change}</p><p>{display.change_percent}%</p></StyledBlockLast>
    </TickerContainer>
  )
}

export default TickerDisplay

const TickerContainer = styled.div`
  width: 200px;
  border-radius: 10px;
  background-color: #EEE;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 5px;
  display: grid;
  border: 1px solid lightgrey;
  grid-template-columns: 1fr 1fr 1fr;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 `;

const TickerName = styled.div`
font-weight: bold;

`;

const StyledBlock = styled.div`
display: flex;
flex-direction: column;
gap: 5px;

`;

const StyledBlockLast = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
 p{
   text-align: right;
   margin: 0;

 }
 
`;

const StyledIcon = styled.div`
font-size: 40px;
color: ${props => props.mainColor ? "lightgreen" : "red"};
display: flex;
flex-direction: column;
justify-content:center;
padding: 5px;

`;