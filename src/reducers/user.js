import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    RENDER_CURRENT_USER
} from '../constants/action';

const initialState = {
    isLoggedIn: !!localStorage.getItem('token'),
    bio: '',
    email: '',
    id: 0,
    createdAt: '',
    image: '',
    token: '', // ???
    updatedAt: '',
    username: '',
    errors: []
}

export default (state=initialState, action) => {
    switch(action.type) {
        case LOGIN_FAILED:
            return {
                ...state,
                errors: action.payload
            }
        case LOGIN_SUCCESS:
            console.log('action',action);
            return {
                ...state,
                isLoggedIn: true,
                bio: action.payload.bio,
                email: action.payload.email,
                id: action.payload.id,
                createdAt: action.payload.createdAt,
                image: action.payload.image,
                token: action.payload.token, // ???
                updatedAt: action.payload.updatedAt,
                username: action.payload.username
            }
        case RENDER_CURRENT_USER: {
            return {
                ...state,
                isLoggedIn: true,
                bio: action.payload.bio,
                email: action.payload.email,
                id: action.payload.id,
                createdAt: action.payload.createdAt,
                image: action.payload.image,
                token: action.payload.token, // ???
                updatedAt: action.payload.updatedAt,
                username: action.payload.username
            }
        }
        default:
            return state;
    }
}