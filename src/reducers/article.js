import {
    RENDER_ARTICLE_PAGE
} from '../constants/action';

const initialState = {
    title: '',
    tagList: [],
    avatar: '',
    createdAt: '',
    body: '',
    user: ''
}

export default (state=initialState, action) => {
    switch(action.type) {
        case RENDER_ARTICLE_PAGE:
            return {
                ...state,
                title: action.payload.title,
                tagList: action.payload.tagList,
                avatar: action.payload.author.image,
                createdAt: action.payload.createdAt,
                body: action.payload.body,
                user: action.payload.author.username
            }
        default:
            return state;
    }
}