import {
    RENDER_ARTICLE,
    APPLY_TAG_FILTER,
    RENDER_POPULAR_TAG,
    RENDER_HOME_PAGE,
    REFRESH_TABS,
    MODIFY_TAB
} from '../constants/action';

const initialState = {
    panes: ['Your Feed', 'Global Feed'],
    selectedTab: 'Your Feed',
    tag: '',
    popularTag: [],
    articles: [],
    articlesCount: 0,
    page: 1,
    size: 10
};

export default (state = initialState, action) => {    
    switch (action.type) {
        case MODIFY_TAB:
            return {
                ...state,
                panes: state.panes.length > 2 ? state.panes.slice(0, 2) : state.panes,
                selectedTab: state.panes.length > 2 ? 'Your Feed' : action.payload,
            }
        case REFRESH_TABS:
            return {
                ...state,
                selectedTab: 'Your Feed',
                panes: state.panes.length > 2 ? state.panes.slice(0, 2) : state.panes
            }
        case RENDER_HOME_PAGE:
            return {
                ...state,
                tag: '',
                panes: localStorage.getItem('token') ? state.panes : state.panes.slice(1),
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                page: 1,
                size: 10
            }
        case RENDER_ARTICLE:
            return {
                ...state,
                panes: localStorage.getItem('token') ? state.panes : state.panes.slice(1),
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                page: action.payload.page || 1,
                size: 10
            }
        case RENDER_POPULAR_TAG:
            return {
                ...state,
                popularTag: action.payload.tags
            }
        case APPLY_TAG_FILTER:
            return {
                ...state,
                selectedTab: action.payload,
                panes: [...state.panes.slice(0,2), action.payload],
                tag: action.payload
            }
        default:
            return state;
    }
}