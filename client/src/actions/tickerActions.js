import { endpoint } from '../constants/connectionConstants'
import {
    TICKER_LIST_REQUEST,
    TICKER_LIST_SUCCESS,
    TICKER_LIST_FAIL,
    SOCKET_UNMOUNT

} from '../constants/tickerConstants'
import io from "socket.io-client";

export const listTickers = (mount) => async (dispatch) => {
    try {



        dispatch({ type: TICKER_LIST_REQUEST })
        const socket = await io.connect(endpoint);
        if (mount) {
            socket.emit('start');
            socket.on('ticker', (response) => {
                const res = Array.isArray(response) ? response : [response];
                dispatch({
                    type: TICKER_LIST_SUCCESS,
                    payload: res
                })

            });
        }
        else {
            dispatch({ type: SOCKET_UNMOUNT })
            socket.close();
        }



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


