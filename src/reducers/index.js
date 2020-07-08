import home from './home';
import article from './article';
import user from './user';

import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    home,
    article,
    user
});

export default rootReducers;