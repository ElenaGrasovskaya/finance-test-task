import { render, screen } from '@testing-library/react';
import TickerDisplay from './components/TickerDisplay';
import TickerSingleChart from './components/TickerSingleChart';
import HomeScreen from './screens/HomeScreen';
import { fakeTicker } from './testUtils/testUtils';
import {Provider} from 'react-redux';
import {displayTickersTemplate} from './constants/tickerConstants';
import store from './store';
const tickers = fakeTicker();

describe('<TickerDisplay/>', () => {
    it('renders out the ticker title', () => {
        const { container , debug } = render(<TickerDisplay ticker={tickers[0]}/>);
        debug();
        expect(screen.getByText("AAPL")).toBeInTheDocument(); 
                
    });

    it('renders and matches a snapshot', () => {
      const { container , debug } = render(<TickerDisplay ticker={tickers[0]}/>);
      debug();
      expect(container).toMatchSnapshot();

  });
     
});

describe('<HomeScreen/>', () => {
  it('renders out the button for changing refresh interval', () => {
      const { container , debug } = render(<Provider store={store}><HomeScreen/></Provider>);
      debug();
      expect(screen.getByText("Apply")).toBeInTheDocument();
      
  });

  it('renders and matches a snapshot', () => {
    const { container , debug } = render(<Provider store={store}><HomeScreen/></Provider>);
    debug();
    expect(container).toMatchSnapshot();

});
   
});

describe('<TickerSingleChart/>', () => {
  it('renders out the title for the chart', () => {
      const { container , debug } = render(<Provider store={store}><TickerSingleChart tickers={displayTickersTemplate} allTickers={[displayTickersTemplate, displayTickersTemplate]} selectedTicker = {"AAPL"}/></Provider>);
      debug();
      expect(screen.getByText("100")).toBeInTheDocument();
      
  });

  it('renders and matches a snapshot', () => {
    const { container , debug } = render(<Provider store={store}><TickerSingleChart tickers={displayTickersTemplate} allTickers={[displayTickersTemplate, displayTickersTemplate]} selectedTicker = {"AAPL"}/></Provider>);
    debug();
    expect(container).toMatchSnapshot();

});
   
});