// Home page
export const HOME_PAGE_LOADED = 'HOME_PAGE_LOADED';
export const HOME_PAGE_UNLOADED = 'HOME_PAGE_UNLOALED';
export const CHANGE_TAB = 'CHANGE_TAB';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const APPLY_TAG_FILTER = 'APPLY_TAG_FILTER';

// User action
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

// Article page
export const ARTICLE_PAGE_LOADED = 'ARTICLE_PAGE_LOADED';
export const ARTICLE_PAGE_UNLOADED = 'ARTICLE_PAGE_UNLOADED';

// Testing
export const LOAD_ARTICLE = 'LOAD_ARTICLE';
export const RENDER_ARTICLE = 'RENDER_ARTICLE';
export const LOAD_POPULAR_TAG = 'LOAD_POPULAR_TAG';
export const RENDER_POPULAR_TAG = 'RENDER_POPULAR_TAG';

export function loadArticle() {
    return {
        type: LOAD_ARTICLE
    };
}

export function loadPopularTag() {
    return {
        type: LOAD_POPULAR_TAG
    };
}