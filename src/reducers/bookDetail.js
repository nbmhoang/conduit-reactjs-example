import {
    RENDER_BOOK_DETAIL
} from '../constants/action';

const inititalState = {
    id: 0,
    name: '',
    category: {},
    author: {},
    image: {},
    pageNumber: 0,
    numberInStorage: 0,
    publishDate: '',
    describe: ''
};

export default (state=inititalState, action) => {
    switch(action.type) {
        case RENDER_BOOK_DETAIL: 
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                pageNumber: action.payload.pageNumber,
                image: action.payload.image,
                author: action.payload.author,
                category: action.payload.category,
                numberInStorage: action.payload.numberInStorage,
                publishDate: action.payload.publishDate,
                describe: action.payload.describe
            }
        default: return state
    }
}