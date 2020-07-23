import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import * as actions from "./actionTypes";

export const signupUser = (data) => dispatch => {
    dispatch({type: actions.SIGNUP});
    axios.post("/api/v1/signup", data)
        .then(res => {
            const { token } = res.data;
            //save token to localstorage
            localStorage.setItem("jwtToken", token);
            //set token to auth header
            setAuthToken(token);
            //Decode toke to get user data
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: actions.SIGNUP_FAIL,
                payload: err.response.data
            })
        })
}


export const loginUser = data => dispatch => {
    axios
        .post("/api/v1/login", data)
        .then(res => {
            const { token } = res.data;
            //save token to localstorage
            localStorage.setItem("jwtToken", token);
            //set token to auth header
            setAuthToken(token);
            //Decode toke to get user data
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: actions.LOGIN_FAIL,
                payload: err.response.data
            })
        })
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: actions.SET_CURRENT_USER,
        payload: decoded
    };
};


// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch({
        type: actions.LOGOUT,
    })
};