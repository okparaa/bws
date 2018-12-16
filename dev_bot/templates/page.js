import { h, Component } from 'preact';
import '@/public/styles/__pageScss__.scss';
import { connect } from 'preact-redux';
import __page__Reducer, { __page__ } from '@/ducks/__pageDir__-ducks/__page__';
import { addReducer } from '@/components/add-reducer';

class __pageClass__ extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="container page">
        
            </div>
        )
    }
}

const mapStateToProps = ({__page__}) => {
    if(!__page__)
        return {};

    return {
        item: __page__.item
    }
}
__pageClass__ = addReducer('__page__', __page__Reducer)(__pageClass__);
export default connect(mapStateToProps, {
    __page__
})(__pageClass__);