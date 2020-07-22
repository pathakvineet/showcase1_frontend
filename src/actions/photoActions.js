import axios from "axios";
import * as actions from "./actionTypes";

export const uploadPhoto = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    dispatch({ type: actions.POST_PHOTO });
    await axios.post("/api/v1/photos/", formData, config)
        .then(res => {

            dispatch({
                type: actions.POST_PHOTO_SUCCESS,
                payload: res.data.responseData
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const deletePhoto = (photoId, authorId) => dispatch => {
    axios
        .delete(`/api/v1/photos/${photoId}`, { data: { authorId: authorId } })
        .then(res => {
            console.log('deletePhoto',res.data);
            dispatch({
                type: actions.DELETE_PHOTO_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}


export const getPhotosForThumbnails = (authorId) => dispatch => {

    axios
        .get(`/api/v1/photos/forThumbnails/${authorId}`)
        .then(res => {

            dispatch({
                type: actions.PHOTO_THUMBNAILS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const getPhotosList = (authorId) => dispatch => {
    axios
        .get(`/api/v1/photos/list/${authorId}`)
        .then(res => {
            dispatch({
                type: actions.PHOTO_LIST,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}
