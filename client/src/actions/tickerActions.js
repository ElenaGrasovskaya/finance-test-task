import { endpoint } from '../constants/tickerConstants'
import {
    TICKER_LIST_REQUEST,
    TICKER_LIST_SUCCESS,
    TICKER_LIST_FAIL,

} from '../constants/tickerConstants'
import io from "socket.io-client";

export const listTickers = () => async (dispatch) => {
    try {


        dispatch({ type: TICKER_LIST_REQUEST })
        const socket = await io.connect(endpoint);
        socket.emit('start');
        socket.on('ticker', (response) => {
            const res = Array.isArray(response) ? response : [response];
            dispatch({
                type: TICKER_LIST_SUCCESS,
                payload: res
            })

        });

    } catch (error) {
        dispatch(
            {
                type: TICKER_LIST_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            }

        )
    }

}

