import { applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'
import { tickerListReducer } from './reducers/tickerReducers';

const reducer = combineReducers({
    tickerList: tickerListReducer,
})

const middlewares = [thunkMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares)
const enhancers = [middlewareEnhancer]
const composedEnhancers = composeWithDevTools(...enhancers)

const store = configureStore({ reducer }, composedEnhancers)

export default store