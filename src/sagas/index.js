import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    LOAD_ARTICLE,
    RENDER_ARTICLE,
    LOAD_POPULAR_TAG,
    RENDER_POPULAR_TAG
} from '../constants/action';

// const response = res => res.data;

axios.default.baseURL = 'https://conduit.productionready.io'

const { get, post } = axios;

export function* fetchArticleList(page=1, size=10) {
    const endpoint = `/api/articles?limit=${size}&offset=${(page-1)*size}`;
    const response = yield call(get, endpoint);
    const data = response.data;    
    yield put({ type: RENDER_ARTICLE, payload: data})
}

export function* watchFetchArticle() {
    // Listen to LOAD_ARTICLE actions to trigger
    yield takeEvery(LOAD_ARTICLE, fetchArticleList);
}

/*
function getArticleByTag(tag, page=1, size=10) {
    // return axios.get(`/api/articles?limit=${size}&offset=${(page-1)*size}&tag=${tag}`).then(response);
}
*/

export function* fetchPopularTag() {
    const endpoint = `/api/tags`;
    const response = yield call(get, endpoint);
    const data = response.data;    
    yield put({ type: RENDER_POPULAR_TAG, payload: data})
}

export function* watchFetchPopularTag() {
    yield takeEvery(LOAD_POPULAR_TAG, fetchPopularTag)
}

export default function* rootSaga() {
    yield all([watchFetchArticle(), watchFetchPopularTag()]);
}