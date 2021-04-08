export const ADD_ALERT = 'ADD_ALERT';

export const addAlert = (message: string) => dispatch => {
    return dispatch({ type: ADD_ALERT, message})
}
