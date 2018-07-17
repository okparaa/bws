import homeReducer from '@/modules/home/home-ducks';
import { combineReducers } from 'redux';

const createReducer = asyncReducers => {
    return combineReducers({
        home: homeReducer,
        ...asyncReducers
    });
}

export default createReducer;