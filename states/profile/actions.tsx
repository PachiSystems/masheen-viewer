export const SET_SELECTED_PROFILE = 'SET_SELECTED_PROFILE';

export const setSelectedProfile = (selectedProfile: SelectedProfile) => dispatch => {
    return dispatch({ type: SET_SELECTED_PROFILE, payload: selectedProfile})
}
