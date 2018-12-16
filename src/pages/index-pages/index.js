import { h, Component } from 'preact';
import '@/public/styles/index.scss';
import { connect } from 'preact-redux';
import indexReducer, { index } from '@/ducks/index-ducks/index';
import { addReducer } from '@/components/add-reducer';
import student from '@/public/assets/student.jpg';

class Index extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div class="container">	
                    <div id="mahadum">
                        FEDERAL UNIVERSITY OF TECHNOLOGY, OWERRI
                    </div> 
                </div>
                <div class="container contain-top contain-bottom">
                    <div id="orms">FUTO</div>
                    <div id="login">
                        <img class="login-img resize" src={student} alt="" />              
                        <form method="POST" action="/users/login" id="login_form" class="form-signin">
                            <input type="hidden" name="security" id="sec" value="735ae969184468b0c1ef4f4d9cafe307-b138bfdf15741f383200941fd417546d" />
                            <input type="email" name="username" class="form-control" id="username" style="width:100%" placeholder="Username (Email)" value="" />
                            <input type="password" name="password" class="form-control" id="password" style="width:100%" placeholder="Password" />
                            <input type="submit" name="submit" style="width:100%" value=" Sign in" />
                            <div class="remember">
                                <label>&nbsp;Remember me <input type="hidden" name="remember" value="0" /></label>
                                <input type="checkbox" id="remember" value="1" name="remember" />
                            </div>
                        </form>                
                        <a href="#" class="need-help">Forgot Password?</a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({index}) => {
    if(!index)
        return {};

    return {
        item: index.item
    }
}
Index = addReducer('index', indexReducer)(Index);
export default connect(mapStateToProps, {
    index
})(Index);