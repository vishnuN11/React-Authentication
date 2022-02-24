import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";
import { rootReducer } from './rootReducer';
import {composeWithDevTools} from "redux-devtools-extension";



let middlewares=[logger,thunk]


let store=createStore(rootReducer,composeWithDevTools(applyMiddleware(...middlewares)))

export{store}