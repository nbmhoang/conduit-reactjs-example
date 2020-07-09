import {
    RENDER_ARTICLE_PAGE,
    RENDER_ARTICLE_COMMENT,
    APPEND_COMMENT
} from '../constants/action';

const initialState = {
    title: '',
    tagList: [],
    slug: '',
    avatar: '',
    createdAt: '',
    body: '',
    user: '',
    favorited: false,
    comments: []
}

export default (state=initialState, action) => {
    switch(action.type) {
        case RENDER_ARTICLE_PAGE:
            return {
                ...state,
                title: action.payload.title,
                slug: action.payload.slug,
                tagList: action.payload.tagList,
                avatar: action.payload.author.image,
                favorited: action.payload.favorited,
                createdAt: action.payload.createdAt,
                body: action.payload.body,
                user: action.payload.author.username
            }
        case RENDER_ARTICLE_COMMENT:
            return {
                ...state,
                comments: action.payload
            }
        case APPEND_COMMENT:            
            return {
                ...state,
                comments: [action.payload.comment, ...state.comments]
            }
        default:
            return state;
    }
}