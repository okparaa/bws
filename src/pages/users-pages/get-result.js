import { h, Component } from 'preact';
import '@/public/styles/users.scss';
import { Link } from 'preact-router/match';
import { connect } from 'preact-redux';
import getResultReducer, { getResult } from '@/ducks/users-ducks/get-result';
import { addReducer } from '@/components/add-reducer';

class GetResult extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="container page">
            get result <Link href="/users/register">register</Link>
            </div>
        )
    }
}

const mapStateToProps = ({getResult}) => {
    if(!getResult)
        return {};

    return {
        item: getResult.item
    }
}
GetResult = addReducer('getResult', getResultReducer)(GetResult);
export default connect(mapStateToProps, {
    getResult
})(GetResult);