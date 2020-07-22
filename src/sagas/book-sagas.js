import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    LOAD_BOOK_HOME,
    RENDER_BOOK_HOME,
    RENDER_ALL_BOOK,
    LOAD_BOOK_DETAIL,
    RENDER_BOOK_DETAIL,
    LOAD_ALL_AUTHOR,
    RENDER_ALL_AUTHOR,
    LOAD_ALL_CATEGORY,
    RENDER_ALL_CATEGORY,
    APPLY_FILTER_BOOK
} from '../constants/action';
import {
    FILTER_BOOK,
    GET_AUTHORS,
    GET_BOOK,
    GET_BOOKS,
    GET_CATEGORIES
} from '../graphql/query';

const baseURL = 'http://localhost:9999/admin/api';

const request = axios.post;

export function* fetchHomePage(action) {
    let response = yield call(request, baseURL, { query: GET_BOOKS, variables: action.payload });
    const books = response.data.data.allBooks;
    const { count } = response.data.data._allBooksMeta;
    response = yield call(request, baseURL, { query: GET_CATEGORIES });
    const categories = response.data.data.allCategories;
    response = yield call(request, baseURL, { query: GET_AUTHORS });
    const authors = response.data.data.allAuthors;
    const page = action.payload.page + 1;
    yield put({ type: RENDER_BOOK_HOME, payload: { books, categories, authors, count, page } })
}

export function* watchFetchHomePage() {
    yield takeEvery(LOAD_BOOK_HOME, fetchHomePage);
}

export function* fetchBook(action) {
    const response = yield call(request, baseURL, { query: GET_BOOK, variables: { id: action.payload } });
    const data = response.data.data.Book;
    yield put({ type: RENDER_BOOK_DETAIL, payload: data });
}

export function* watchFetchBook() {
    yield takeEvery(LOAD_BOOK_DETAIL, fetchBook);
}

export function* fetchAllCategory() {
    const response = yield call(request, baseURL, { query: GET_CATEGORIES });
    const data = response.data.data.allCategories;
    yield put({ type: RENDER_ALL_CATEGORY, payload: data });
}

export function* watchFetchAllCategory() {
    yield takeEvery(LOAD_ALL_CATEGORY, fetchAllCategory);
}

export function* fetchAllAuthor() {
    const response = yield call(request, baseURL, { query: GET_AUTHORS });
    const data = response.data.data.allAuthors;
    yield put({ type: RENDER_ALL_AUTHOR, payload: data });
}

export function* watchFetchAllAuthor() {
    yield takeEvery(LOAD_ALL_AUTHOR, fetchAllAuthor);
}

export function* fetchFilterBook(action) {
    const response = yield call(request, baseURL, { query: FILTER_BOOK, variables: action.payload });
    const books = response.data.data.allBooks;
    const { count } = response.data.data._allBooksMeta;
    yield put({ type: RENDER_ALL_BOOK, payload: { books, count } });
}

export function* watchFetchFilterBook() {
    yield takeEvery(APPLY_FILTER_BOOK, fetchFilterBook);
}

export default function* rootSaga() {
    yield all([
        watchFetchBook(),
        watchFetchAllCategory(),
        watchFetchAllAuthor(),
        watchFetchFilterBook(),
        watchFetchHomePage(),
    ]);
} 