import { all, call, put, takeEvery, take } from 'redux-saga/effects';
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
    LOGGIN_SUCCESS,
    CLICK_ON_TAB,
    MODIFY_TAB
} from '../constants/action';

axios.default.baseURL = 'https://conduit.productionready.io'

const { get, post } = axios;

export function* fetchHomePage(action) {
    const page = action.page || 1;
    const size = action.size || 10;
    const endpoint = `/api/articles?limit=${size}&offset=${(page-1)*size}`;
    const response = yield call(get, endpoint);
    const data = response.data;
    yield put({ type: RENDER_HOME_PAGE, payload: data})
}

export function* fetchAllArticle(action) {
    const page = action.page || 1;
    const size = action.size || 10;
    const tag = action.tag || '';
    console.log('url=',`/api/articles?limit=${size}&offset=${(page-1)*size}&tag=${tag}`);
    
    const endpoint = `/api/articles?limit=${size}&offset=${(page-1)*size}&tag=${tag}`;
    const response = yield call(get, endpoint);
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

export function* watchHomepage() {
    yield takeEvery(LOAD_HOME_PAGE, fetchHomePage);
}


export function* fetchArticleByTag(action) {
    const page = action.page || 1;
    const size = action.size || 10;
    const tag = action.payload;
    const endpoint = `/api/articles?limit=${size}&offset=${(page-1)*size}&tag=${tag}`;
    const response = yield call(get, endpoint);
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
        const data = response.data;
        console.log('Res',data);
        yield localStorage.setItem('token', data.user.token);
        yield put({ type: LOGGIN_SUCCESS, payload: data})
    } catch (error) {
        //console.log(axios);
        
        console.log('Error', error);
    }
}

export function* watchLogin() {
    yield takeEvery( LOGIN, login);
}

export function* changeTab(action) {
    // console.log('Payload',action.payload);
    yield put({ type: MODIFY_TAB, payload: action.payload})
}

export function* watchChangeTab() {
    yield takeEvery( CLICK_ON_TAB, changeTab);
}

export default function* rootSaga() {
    yield all([watchFetchAllArticle(), watchFetchPopularTag(), watchFetchArticleByTag(), watchPageChange(), watchHomepage(), watchFetchArticleDetail(), watchLogin(), watchChangeTab()]);
}