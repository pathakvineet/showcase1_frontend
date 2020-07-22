import * as actions from '../actions/actionTypes';

const initialState = {
    cloths: {},
    matchesWon: [],
    searchTeam: '',
    weather: {},
    news: {}
}

export default function (state = initialState, action) {
   
    switch (action.type) {
        case actions.CLOTHS_SUCCESS:
            return {
                ...state,
                cloths: action.payload.clothsData

            }
        case actions.MATCH_LIST_SUCCESS:
            return {
                ...state,
                matchesWon: action.payload.list,
                searchTeam : action.payload.searchTeam
            }
        case actions.CLEAR_MATCH_DATA:
            return{
                ...state,
                matchesWon : [],
                searchTeam : ''
            }
        case actions.WEATHER_SUCCESS:
            return{
                ...state,
                weather: action.payload
            }
        case actions.NEWS_SUCCESS:
            return{
                ...state,
                news: action.payload
            }
        default:
            return state;
    }
}