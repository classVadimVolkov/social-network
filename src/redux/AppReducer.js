import {getAuthUserData} from "./AuthReducer";

const SET_INITIALIZED = '/AppReducer/SET_INITIALIZED'

let initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccessful = () => ({
    type: SET_INITIALIZED
})

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    promise.then(() => {
        dispatch(initializedSuccessful())
    })
}
