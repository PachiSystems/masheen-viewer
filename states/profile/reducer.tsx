import { IProfile } from "./state";
import * as profileActions from './actions';

const initialState: IProfile = {
    profileID: null,
    displayName: ''
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case profileActions.SET_SELECTED_PROFILE:
            return Object.assign({}, state, {...action.payload})
        default: return state
    }
}
