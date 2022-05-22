import { render, screen } from '@testing-library/react';
import TickerDisplay from './components/TickerDisplay'
import HomeScreen from './screens/HomeScreen'
import { fakeTicker } from './testUtils/testUtils';
import {Provider} from 'react-redux';
import store from './store'
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