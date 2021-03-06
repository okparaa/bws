import { h, Component } from 'preact';
import '@/public/styles/users.scss';
import { Link } from 'preact-router/match';
import { connect } from 'preact-redux';
import registerReducer, { register } from '@/ducks/users-ducks/register';
import { addReducer } from '@/components/add-reducer';

class Register extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="container page">
                register <Link href="/users/get-result">get result</Link>
            </div>
        )
    }
}

const mapStateToProps = ({register}) => {
    if(!register)
        return {};

    return {
        item: register.item
    }
}
Register = addReducer('register', registerReducer)(Register);
export default connect(mapStateToProps, {
    register
})(Register);