import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { baseURL } from '../constants/config';
import {
    LOAD_BOOK_HOME,
    RENDER_LIST_BOOK,
    LOAD_BOOK_DETAIL,
    RENDER_BOOK_DETAIL,
    APPLY_FILTER_BOOK,
    LOAD_MORE_BOOK,
    CHANGE_ORDER,
    RENDER_MORE_BOOK
} from '../constants/action';
import {
    GET_DATA,
    FILTER_BOOK,
    GET_BOOK,
} from '../graphql/query';

const graphql = (query, variables={}) => {
    return axios.post(baseURL, {
        query,
        variables
    }).then(res => res).catch(err => console.log(err));
};

export function* fetchHomePage(action) {
    // console.log('Current order by', action.payload.orderBy);
    const response = yield call(graphql, GET_DATA, action.payload)
    const { books, categories, authors } = response.data.data;
    const { count } = response.data.data._allBooksMeta;
    const page = action.payload.page + 1;
    const { orderBy } = action.payload;
    if (action.type === CHANGE_ORDER) {
        // Set order
        yield put({ type: RENDER_LIST_BOOK, payload: { orderBy, books, categories, authors, count, page } })
    } else {
        // Load homepage or more books
        yield put({ type: RENDER_MORE_BOOK, payload: { books, categories, authors, count, page } })
    }
    
}

export function* watchFetchHomePage() {
    yield takeEvery(LOAD_BOOK_HOME, fetchHomePage);
}

export function* watchFetchMoreBook() {
    yield takeEvery(LOAD_MORE_BOOK, fetchHomePage);
}

export function* watchChangeOrder() {
    yield takeEvery(CHANGE_ORDER, fetchHomePage);
}

export function* fetchBook(action) {
    const response = yield call(graphql, GET_BOOK, { id: action.payload })
    const data = response.data.data.Book;
    yield put({ type: RENDER_BOOK_DETAIL, payload: data });
}

export function* watchFetchBook() {
    yield takeEvery(LOAD_BOOK_DETAIL, fetchBook);
}

export function* fetchFilterBook(action) {
    const response = yield call(graphql, FILTER_BOOK, action.payload)
    const { books } = response.data.data;
    const { count } = response.data.data._allBooksMeta;
    const page = action.payload.page + 1;
    yield put({ type: RENDER_LIST_BOOK, payload: { books, count, page } });
}

export function* watchFetchFilterBook() {
    yield takeEvery(APPLY_FILTER_BOOK, fetchFilterBook);
}

export function* clearHomePageData() {
    yield put({ type: "XYZ" });
}

export function* watchClearHomePageData() {
    yield takeEvery("CLEAR", clearHomePageData);
}

export default function* rootSaga() {
    yield all([
        watchFetchBook(),
        watchFetchFilterBook(),
        watchFetchHomePage(),
        watchClearHomePageData(),
        watchFetchMoreBook(),
        watchChangeOrder(),
    ]);
} 