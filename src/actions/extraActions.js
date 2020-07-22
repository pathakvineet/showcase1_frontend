import axios from "axios";
import * as actions from "./actionTypes";
let Parser = require('rss-parser');
let parser = new Parser();


export const getWeatherReport = (data) => dispatch => {

    axios.get('/api/v1/base/weather', {
        params: {
            lat: data.coords.latitude,
            lon: data.coords.longitude
        }
    })
        .then(res =>{
           dispatch({
               type: actions.WEATHER_SUCCESS,
               payload: res.data
           })
        })
        .catch(err => {
            console.log(err);
        });
}

export const getClothsList = () => dispatch => {
    axios.get('/api/v1/base/cloths')
        .then(res => {
            dispatch({
                type: actions.CLOTHS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}


export const getMatchesWon = (team) => dispatch => {
    axios.get(`/api/v1/base/getloosingteams/${team}`)
        .then(res => {
            dispatch({
                type: actions.MATCH_LIST_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const clearMatchData = () => dispatch => {
    dispatch({
        type: actions.CLEAR_MATCH_DATA
    })
}


export const getLatestNews = () => async dispatch => {
    axios.get(`/api/v1/base/news`)
        .then(res => {
            dispatch({
                type: actions.NEWS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}