import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    LOAD_ARTICLE,
    RENDER_ARTICLE,
    LOAD_POPULAR_TAG,
    RENDER_POPULAR_TAG,
    APPLY_TAG_FILTER,
    CHANGE_PAGE,
    LOAD_HOME_PAGE,
    RENDER_HOME_PAGE,
    LOAD_ARTICLE_PAGE,
    RENDER_ARTICLE_PAGE,
    LOGIN,
    LOGIN_SUCCESS,
    CLICK_ON_TAB,
    CHANGE_TAB,
    LOAD_CURRENT_USER,
    RENDER_CURRENT_USER,
    LOAD_ARTICLE_COMMENT,
    RENDER_ARTICLE_COMMENT,
    DELETE_COMMENT,
    LOGIN_FAILED,
    POST_COMMENT,
    APPEND_COMMENT,
    LOAD_TAB,
    RENDER_TAB
} from '../constants/action';
import { authHeader } from '../components/AuthorizationHeader';

axios.defaults.baseURL = 'https://conduit.productionready.io'

const { get, post } = axios;

export function* fetchHomePage(action) {
    const page = action.page || 1;
    const size = action.size || 10;
    const endpoint = `/api/articles?limit=${size}&offset=${(page-1)*size}`;
    const response = yield call(get, endpoint, { headers: authHeader() });
    const data = response.data;
    yield put({ type: RENDER_HOME_PAGE, payload: {...data, targetTab: 'Global Feed'} })
}

export function* watchHomepage() {
    yield takeEvery(LOAD_HOME_PAGE, fetchHomePage);
}

export function* fetchAllArticle(action) {
    const page = action.page || 1;
    const size = action.size || 10;
    const tag = action.tag || '';
    const endpoint = `/api/articles?limit=${size}&offset=${(page-1)*size}&tag=${tag}`;
    const response = yield call(get, endpoint, { headers: authHeader()});
    const data = response.data;
    yield put({ type: RENDER_ARTICLE, payload: {...data, page: page, tag: tag} })
}

export function* watchFetchAllArticle() {
    // Listen to LOAD_ARTICLE actions to trigger
    yield takeEvery(LOAD_ARTICLE, fetchAllArticle);
}

export function* watchPageChange() {
    yield takeEvery(CHANGE_PAGE, fetchAllArticle);
}

export function* fetchArticleByTag(action) {
    const page = action.page || 1;
    const size = action.size || 10;
    const tag = action.payload;
    const endpoint = `/api/articles?limit=${size}&offset=${(page-1)*size}&tag=${tag}`;
    const response = yield call(get, endpoint, { headers: authHeader() });
    const data = response.data;
    yield put({ type: RENDER_ARTICLE, payload: {...data, tag}})
}

export function* watchFetchArticleByTag() {
    yield takeEvery(APPLY_TAG_FILTER, fetchArticleByTag);
}

export function* fetchPopularTag() {
    const endpoint = `/api/tags`;
    const response = yield call(get, endpoint);
    const data = response.data;    
    yield put({ type: RENDER_POPULAR_TAG, payload: data})
}

export function* watchFetchPopularTag() {
    yield takeEvery(LOAD_POPULAR_TAG, fetchPopularTag)
}

export function* fetchArticleDetail(action) {
    const endpoint = `/api/articles/${action.slug}`;
    const response = yield call(get, endpoint);
    const data = response.data.article;    
    
    yield put({ type: RENDER_ARTICLE_PAGE, payload: data})
}

export function* watchFetchArticleDetail() {
    yield takeEvery(LOAD_ARTICLE_PAGE, fetchArticleDetail);
}

export function* login(action) {
    // console.log('base',axios.default.baseURL);
    
    const endpoint = '/api/users/login';
    try {
        const response = yield call(post, endpoint, action.payload);    
        const data = response.data.user;
        // console.log('Res',data);
        yield localStorage.setItem('token', data.token);
        yield put({ type: LOGIN_SUCCESS, payload: data});
    } catch (error) {
        // console.log(err.response);
        
        if (error.response.data && error.response.data.errors) {
            yield put({ type: LOGIN_FAILED, payload: error.response.data.errors })
        }
    }
}

export function* watchLogin() {
    yield takeEvery( LOGIN, login);
}

export function* changeTab(action) {
    const targetTab = action.payload;
    console.log('Target=',targetTab);
    if (targetTab === 'Global Feed') {
        yield put({ type: LOAD_HOME_PAGE, payload: { targetTab: targetTab } })
    } else {
        yield put({ type: CHANGE_TAB, payload: targetTab})    
    }
}

export function* watchChangeTab() {
    yield takeEvery( CLICK_ON_TAB, changeTab);
}

export function* fetchCurrentUser() {
    const endpoint = '/api/user';
    try {
        const response = yield call(get, endpoint, {headers: authHeader()});
        // console.log(response.data);
        const data = response.data.user;
        yield put({ type: RENDER_CURRENT_USER, payload: data });
    } catch (error) {
        
    }
}

export function* watchFetchCurrentUser() {
    yield takeEvery( LOAD_CURRENT_USER, fetchCurrentUser );
}

export function* fetchArticleComment(action) {
    const endpoint = `/api/articles/${action.slug}/comments`;
    try {
        const response = yield call(get, endpoint);
        const data = response.data.comments;
        yield put({ type: RENDER_ARTICLE_COMMENT, payload: data });
    } catch (error) {
        
    }
}

export function* watchFetchArticleComment() {
    yield takeEvery( LOAD_ARTICLE_COMMENT, fetchArticleComment);
}

export function* deleteComment(action) {
    // console.log('Delete',action.payload);
    const endpoint = `/api/articles/${action.payload.slug}/comments/${action.payload.commentId}`;
    try {
        yield call(axios.delete, endpoint, { headers: authHeader() });
        yield put({ type: LOAD_ARTICLE_COMMENT, slug: action.payload.slug})
    } catch (error) {
        console.log(error);
        
    }
}

export function* watchDeleteComment() {
    yield takeEvery( DELETE_COMMENT, deleteComment);
}

export function* postComment(action) {
    const endpoint = `/api/articles/${action.payload.slug}/comments`;
    try {
        const body = {
            comment: {
                body: action.payload.commentBody
            }
        }
        const response = yield call(post, endpoint, body, { headers: authHeader() });
        const { data } = response;
        console.log('Comment res = ',data);
        yield put({ type: APPEND_COMMENT, payload: data});
    } catch (error) {
        console.log('Error', error);
        
    }
}

export function* watchPostComment() {
    yield takeEvery(POST_COMMENT, postComment);
}

export function* fetchTab() {
    yield put({ type: RENDER_TAB });
}

export function* watchFetchTab() {
    yield takeEvery(LOAD_TAB, fetchTab);
}

export default function* rootSaga() {
    yield all([
        watchFetchAllArticle(),
        watchFetchPopularTag(),
        watchFetchArticleByTag(),
        watchPageChange(),
        watchHomepage(),
        watchFetchArticleDetail(),
        watchLogin(),
        watchChangeTab(),
        watchFetchCurrentUser(),
        watchFetchArticleComment(),
        watchDeleteComment(),
        watchPostComment(),
        watchFetchTab()
    ]);
}