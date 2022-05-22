import { render } from '@test-ng-library/react';

describe(<TickerDisplay />, () => {
    it('renders out the ticker price and title', () => {
        const { container } = render(<p>This is a test</p>);
        console.log(container);
    });

    it('renders and matches a snapshot', () => {
        const { container } = render(<p>This is a test</p>);
        console.log(container);
    });

});