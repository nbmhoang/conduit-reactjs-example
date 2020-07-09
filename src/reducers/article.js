import {
    RENDER_ARTICLE_PAGE,
    RENDER_ARTICLE_COMMENT
} from '../constants/action';

const initialState = {
    title: '',
    tagList: [],
    slug: '',
    avatar: '',
    createdAt: '',
    body: '',
    user: '',
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
                createdAt: action.payload.createdAt,
                body: action.payload.body,
                user: action.payload.author.username
            }
        case RENDER_ARTICLE_COMMENT:
            return {
                ...state,
                comments: action.payload
            }
        default:
            return state;
    }
}