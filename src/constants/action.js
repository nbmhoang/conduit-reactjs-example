// User action
export const LOGIN = 'LOGIN';
export const LOGGIN_SUCCESS = 'LOGGIN_SUCCESS';

export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

// Article page
export const LOAD_ARTICLE_PAGE = 'LOAD_ARTICLE_PAGE';
export const RENDER_ARTICLE_PAGE = 'RENDER_ARTICLE_PAGE';

// Testing
export const LOAD_HOME_PAGE = 'LOAD_HOME_PAGE';
export const RENDER_HOME_PAGE = 'RENDER_HOME_PAGE';
export const LOAD_ARTICLE = 'LOAD_ARTICLE';
export const RENDER_ARTICLE = 'RENDER_ARTICLE';
export const LOAD_POPULAR_TAG = 'LOAD_POPULAR_TAG';
export const RENDER_POPULAR_TAG = 'RENDER_POPULAR_TAG';

export const APPLY_TAG_FILTER = 'APPLY_TAG_FILTER';

export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CLICK_ON_TAB = 'CLICK_ON_TAB';
export const MODIFY_TAB = 'MODIFY_TAB';
export const REFRESH_TABS = 'REFRESH_TABS';


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