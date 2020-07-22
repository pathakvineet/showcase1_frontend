import * as actions from '../actions/actionTypes';

const initialState = {
    tasksList: [],
    error: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.CREATE_TASK_SUCCESS:
            return {
                ...state,
                tasksList: [...state.tasksList, action.payload]
            }
        case actions.DELETE_TASK_SUCCESS:
            return {
                ...state,
                tasksList: state.tasksList.filter(item => item._id !== action.payload._id)
            }
        case actions.TASKS_LIST:
            return {
                ...state,
                tasksList: action.payload
            }
        case actions.UPDATE_TASK_SUCCESS:
            return {
                ...state,
                tasksList: state.tasksList.map(task => { if (task._id === action.payload._id) { return { ...task, ...action.payload } } return task; })
            }

        default:
            return state;
    }
}