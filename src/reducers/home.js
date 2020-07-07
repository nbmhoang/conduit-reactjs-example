import { APPLY_TAG_FILTER, HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, CHANGE_PAGE } from '../constants/action';

export default (state = {}, action) => {
    switch (action.type) {
        case APPLY_TAG_FILTER:
            return {
                ...state,
                selectedTab: 'some-tag',
                tag: `#${action.tag}`,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                page: 1,
                size: 10
            }
        case HOME_PAGE_UNLOADED:
            return {}
        case HOME_PAGE_LOADED:                        
            return {
                ...state,
                tag: '',
                selectedTab: 'global',
                popularTag: action.payload.tags,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                page: 1,
                size: 10
            }
        case CHANGE_PAGE:  
            return {
                ...state,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                size: 10,
                page: action.page
            }
        default:
            return state;
    }
}