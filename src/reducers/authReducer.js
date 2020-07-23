import * as actions from '../actions/actionTypes';
const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    error: {},
    signupLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.SIGNUP:
            return {
                ...state,
                signupLoading: true
            }
        case actions.SIGNUP_SUCCESS:
            return {
                ...state,
                signupLoading: false
            }
        case actions.SIGNUP_FAIL:
            return {
                ...state,
                signupLoading: false
            }
        case actions.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}