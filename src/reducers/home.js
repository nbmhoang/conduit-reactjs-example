import {
    RENDER_ARTICLE,
    APPLY_TAG_FILTER,
    RENDER_POPULAR_TAG,
    RENDER_HOME_PAGE,
    REFRESH_TABS,
    MODIFY_TAB
} from '../constants/action';

const initialState = {
    panes: [],
    maxTab: 0,
    selectedTab: '',
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
                panes: state.panes.length > state.maxTab ? state.panes.slice(0, state.maxTab) : state.panes,
                selectedTab: state.panes.length > state.maxTab ? state.panes[0] : action.payload,
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
                panes: localStorage.getItem('token') ? ['Your Feed', 'Global Feed'] : ['Global Feed'],
                maxTab: localStorage.getItem('token') ? 2 : 1,
                selectedTab: state.panes[0],
                articles: localStorage.getItem('token') ? [] : action.payload.articles,
                articlesCount: localStorage.getItem('token') ? 0 :action.payload.articlesCount,
                page: 1,
                size: 10
            }
        case RENDER_ARTICLE:
            return {
                ...state,
                // panes: localStorage.getItem('token') ? ['Your Pane', 'Global Feed'] : ['Global Feed'],
                selectedTab: action.payload.tag,
                maxTab: localStorage.getItem('token') ? 2 : 1,
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
                panes: [...state.panes.slice(0, state.maxTab), action.payload],
                tag: action.payload
            }
        default:
            return state;
    }
}