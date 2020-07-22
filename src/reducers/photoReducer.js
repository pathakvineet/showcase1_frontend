import * as actions from '../actions/actionTypes';

const initialState = {
    photosList: [],
    photoThumbnails: [],
    error: {},
    uploading: false
}

export default function (state = initialState, action) {
    switch (action.type){
        case actions.POST_PHOTO:
            return{
                ...state,
                uploading: true
            }
        case actions.POST_PHOTO_SUCCESS:
            return{
                ...state,
                photosList: [action.payload,...state.photosList],
                uploading: false          
            }
        case actions.DELETE_PHOTO_SUCCESS:
            if (state.photoThumbnails.find(photo => photo._id === action.payload._id)) {
                return{
                    ...state,
                    photosList: state.photosList.filter(item => item._id !== action.payload._id),
                    photoThumbnails:  state.photoThumbnails.filter(item => item._id !== action.payload._id)
                }
            }else{
                return{
                    ...state,
                    photosList: state.photosList.filter(item => item._id !== action.payload._id)        
                }
            }
        case actions.PHOTO_THUMBNAILS:
            return{
                ...state,
                photoThumbnails: action.payload
            }
        case actions.PHOTO_LIST:
            return{
                ...state,
                photosList: action.payload
            }
        default:
            return state;
    }
}