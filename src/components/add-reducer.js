import { h }  from 'preact';
import { object } from 'prop-types';

const addReducer = (key, reducer) => WrappedComponent => {
    const Extended = (props, context) => {
        context.store.injectReducer(key, reducer);
        return <WrappedComponent {...props} />
    };
    Extended.contextTypes = {
        store: object
    };

    return Extended;
}

export { addReducer };