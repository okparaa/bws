import { combineReducers } from 'redux';

import indexReducer from '@/ducks/index-ducks/index';

const createReducer = asyncReducers => {
    return combineReducers({
        index: indexReducer,
        ...asyncReducers
    });
}

export default createReducer;