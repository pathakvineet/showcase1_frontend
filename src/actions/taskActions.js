import axios from "axios";
import * as actions from "./actionTypes";


export const createNewTask = (data) => dispatch => {
    axios
        .post("/api/v1/tasks/", data)
        .then(res => {
            dispatch({
                type: actions.CREATE_TASK_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: actions.CREATE_TASK_FAIL,
                payload: err.response.data
            })
        })
}

export const updateTask = (data) => dispatch => {
    axios.put(`/api/v1/tasks/:${data.taskId}`, data)
        .then(res => {
            dispatch({
                type: actions.UPDATE_TASK_SUCCESS,
                payload: res.data.data
            })      
        })
        .catch(err => {
           
        })
}

export const deleteTask = (taskId, authorId) => dispatch => {

    axios
        .delete(`/api/v1/tasks/${taskId}`, { data: { authorId: authorId } })
        .then(res => {
            dispatch({
                type: actions.DELETE_TASK_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}




export const viewAllTasks = (authorId) => dispatch => {

    axios
        .get(`/api/v1/tasks/viewAllTasks/${authorId}`)
        .then(res => {
           
            dispatch({
                type: actions.TASKS_LIST,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

