import {
    LOGGIN_SUCCESS
} from '../constants/action';


export default (state={}, action) => {
    switch(action.type) {
        case LOGGIN_SUCCESS:
            return {
                ...state,
                bio: action.payload.bio,
                email: action.payload.email,
                id: action.payload.id,
                createdAt: action.payload.createdAt,
                image: action.payload.image,
                token: action.payload.token, // ???
                updatedAt: action.payload.updatedAt,
                username: action.payload.username
            }
        default:
            return state;
    }
}