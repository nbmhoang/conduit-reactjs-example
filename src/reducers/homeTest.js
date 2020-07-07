import { RENDER_ARTICLE, LOAD_ARTICLE, RENDER_POPULAR_TAG } from '../constants/action';

const initialState = {
    tag: '',
    selectedTab: 'global',
    popularTag: [],
    articles: [],
    articlesCount: 0,
    page: 1,
    size: 10
};

export default (state = initialState, action) => {    
    switch (action.type) {
        case RENDER_ARTICLE:                        
            return {
                ...state,
                tag: '',
                selectedTab: 'global',
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                page: 1,
                size: 10
            }
        case RENDER_POPULAR_TAG:
            return {
                ...state,
                popularTag: action.payload.tags
            }
        default:
            return state;
    }
}