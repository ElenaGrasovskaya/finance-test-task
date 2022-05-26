import styled from 'styled-components';

export const TickerContainer = styled.div`
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

export const TickerName = styled.div`
font-weight: bold;

`;

export const StyledBlock = styled.div`
display: flex;
flex-direction: column;
gap: 5px;


`;

export const StyledBlockLast = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
 p{
   text-align: right;
   margin: 0;
 }
 
`;
export const StyledIcon = styled.div`
font-size: 40px;
color: ${props => props.mainColor ? "lightgreen" : "red"};
display: flex;
flex-direction: column;
justify-content:center;
padding: 5px;

`;

