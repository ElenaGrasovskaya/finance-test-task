import {
    TICKER_LIST_REQUEST,
    TICKER_LIST_SUCCESS,
    TICKER_LIST_FAIL,
    SOCKET_UNMOUNT

} from '../constants/tickerConstants'

export const tickerListReducer = (state = { tickers: [], allTickers: [] }, action) => {
    switch (action.type) {
        case TICKER_LIST_REQUEST:
            return { loading: true, tickers: state.tickers,
                allTickers: state.allTickers }

        case TICKER_LIST_SUCCESS:
            return {
                loading: false, tickers: action.payload, allTickers: [action.payload, ...(state.allTickers.lenth < 15) ? (state.allTickers) : (state.allTickers.slice(0, 19))]
            }

        case TICKER_LIST_FAIL:
            return { loading: false, error: action.payload }

        case TICKER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case SOCKET_UNMOUNT:
            return {
                loading: false, tickers: state.tickers,
                allTickers: state.allTickers
            }

        default:
            return state

    }
}
