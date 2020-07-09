import {
    RENDER_ARTICLE,
    APPLY_TAG_FILTER,
    RENDER_POPULAR_TAG,
    RENDER_HOME_PAGE,
    CHANGE_TAB,
    RENDER_TAB
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
        // Just render tab on home page(not data)
        case RENDER_TAB:
            return {
                ...state,
                panes: localStorage.getItem('token') ? ['Your Feed', 'Global Feed'] : ['Global Feed'],
                maxTab: localStorage.getItem('token') ? 3 : 2,
                selectedTab: state.panes[0]
            }
        // When user click on a tab
        // If user click on Global tab => Fetch data
        // Otherwise, reset data
        case CHANGE_TAB:
            return {
                ...state,
                articles: [],
                articlesCount: 0,
                panes: state.panes.length > state.maxTab ? state.panes.slice(0, state.maxTab) : state.panes,
                selectedTab: state.panes.indexOf(action.payload) >= state.maxTab ? state.panes[0] : action.payload,
            }
        case RENDER_HOME_PAGE:
            return {
                ...state,
                tag: '',
                panes: localStorage.getItem('token') ? ['Your Feed', 'Global Feed'] : ['Global Feed'],
                maxTab: localStorage.getItem('token') ? 2 : 1,
                selectedTab: action.payload.targetTab || state.panes[0],
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                page: 1,
                size: 10
            }
        case RENDER_ARTICLE:
            return {
                ...state,
                maxTab: localStorage.getItem('token') ? 2 : 1,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                tag: action.payload.tag,
                page: action.payload.page || 1,
                size: 10
            }
        case RENDER_POPULAR_TAG:
            return {
                ...state,
                popularTag: action.payload.tags
            }
        // When user click any tags on pupolar tag
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