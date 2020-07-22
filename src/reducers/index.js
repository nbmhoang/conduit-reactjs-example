import home from './home';
import article from './article';
import user from './user';
import book from './book';
import bookDetail from './bookDetail';

import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    home,
    article,
    user,
    book,
    bookDetail
});

export default rootReducers;