import * as actions from '../actions/actionTypes';
const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    error: {}   
}

export default function (state = initialState, action) {
    switch (action.type){
        case actions.SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}