import {
    RENDER_BOOK_HOME,
    RENDER_ALL_BOOK,
    RENDER_ALL_AUTHOR,
    RENDER_ALL_CATEGORY
} from '../constants/action';

const inititalState = {
    books: [],
    authors: [],
    categories: [],
    count: 0,
    page: 0, // Default offset is 0
    size: 5 // Default items per page is 10
};

export default (state=inititalState, action) => {
    switch(action.type) {
        case RENDER_ALL_BOOK: 
            return {
                ...state,
                books: [...state.books, ...action.payload.books],
                count: action.payload.count,
                page: action.payload.page ? action.payload.page : 0 
            }
        case RENDER_ALL_AUTHOR:
            return {
                ...state,
                authors: action.payload
            }
        case RENDER_ALL_CATEGORY:
            return {
                ...state,
                categories: action.payload
            }
        case RENDER_BOOK_HOME:
            return {
                ...state,
                books: [...state.books, ...action.payload.books],
                authors: action.payload.authors,
                categories: action.payload.categories,
                count: action.payload.count,
                page: action.payload.page ? action.payload.page : 0
            }
        default: return state
    }
}