import { IAlert } from "./state";
import * as alertActions from './actions';

const initialState: IAlert = {
    message: ''
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case alertActions.ADD_ALERT:
            return Object.assign({}, state, {message: action.message})
        default: return state
    }
}
