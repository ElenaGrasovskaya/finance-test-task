import styled from 'styled-components';

export const StyledContainer = styled.div`
 display: flex;
 flex-direction: row;
 gap: 20px;
 justify-content: center;
 padding: 20px 5%;
 flex-wrap: wrap;
  
 `;

export const StyledHeader = styled.h1`
text-align: center;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const TickerContainer = styled.a`
border: 0;
text-decoration: none;
display: flex;
flex-direction: column;
`;

export const CloseButton = styled.button`

border: none;
background-color: transparent;
text-align: right;
color: darkred;
font-size: 16px;
&:hover {
    color:red;
}

`;

export const RefreshButton = styled.button`

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

export const IntervalForm = styled.form`

display: flex;
flex-direction: row;
justify-content: center;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
gap: 10px;

`;



export const TickerDisplayButton = styled.button`

border:none;
background: none;

`;