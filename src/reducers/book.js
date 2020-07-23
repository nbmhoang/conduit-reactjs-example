import {
    RENDER_MORE_BOOK,
    RENDER_BOOK_HOME,
    RENDER_LIST_BOOK,
} from '../constants/action';

const inititalState = {
    books: [],
    authors: [],
    categories: [],
    more: false,
    page: 0, // Default offset is 0
    size: 5, // Default items per page is 5
    orderBy: 'name_ASC'
};

export default (state=inititalState, action) => {
    switch(action.type) {
        case "XYZ":
            return inititalState
        case RENDER_MORE_BOOK:
            return {
                ...state,
                books: [...state.books, ...action.payload.books],
                authors: action.payload.authors,
                categories: action.payload.categories,
                page: action.payload.page ? action.payload.page : 0,
                more: state.books.length + action.payload.books.length < action.payload.count,
            }
        case RENDER_LIST_BOOK:
            return {
                ...state,
                books: action.payload.books,
                page: action.payload.page ? action.payload.page : 0,
                more: action.payload.books.length < action.payload.count,
                orderBy: action.payload.orderBy
            }
        case RENDER_BOOK_HOME:
            return {
                ...state,
                books: [...state.books, ...action.payload.books],
                authors: action.payload.authors,
                categories: action.payload.categories,
                page: action.payload.page ? action.payload.page : 0,
                more: state.books.length + action.payload.books.length < action.payload.count,
            }
        default: return state
    }
}