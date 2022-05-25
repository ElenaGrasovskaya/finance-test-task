import React from 'react';
import { BsArrowDownSquareFill } from "react-icons/bs";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { TickerContainer, StyledIcon, StyledBlock, TickerName, StyledBlockLast } from "../styledComponents/TickerDisplayStyles"

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

