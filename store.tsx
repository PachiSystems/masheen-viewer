import {createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from 'redux-thunk';
import { reducer as alertReducer } from './states/alert/reducer';
import {reducer as profileReducer} from './states/profile/reducer';

export const initStore = (initialState) => {
    return createStore(combineReducers({
        alert: alertReducer,
        profile: profileReducer
    }), initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
