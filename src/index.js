import 'babel-polyfill';
import {h, render } from 'preact';
import App from '@/components/App';
import initializeStore from '@/store';
import { Provider } from 'preact-redux';

var store = initializeStore();

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app')
);