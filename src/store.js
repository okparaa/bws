import { createStore, applyMiddleware } from 'redux';
import rootReducer from '@/root-reducer';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {

}

const initializeStore = () => {
    const store = createStore(
        rootReducer(),
        initialState,  
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
    store.asyncReducers = {};
    store.injectReducer = (key, reducer) => {
        store.asyncReducers[key] = reducer;
        store.replaceReducer(
            rootReducer(store.asyncReducers)
        );
        return store;
    }
    return store;
}

export default initializeStore;