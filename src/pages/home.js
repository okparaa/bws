import { h, Component } from 'preact';
import FbLogin from '@/components/facebook'
import { Link } from 'preact-router/match';
import { login, loginSuccess, loginError } from '@/modules/home-ducks';
import Menu from '@/components/menu';
import '@/public/styles/home.scss';
import { connect } from 'preact-redux';
import { route } from 'preact-router';
import auth from '@/utils/auth';

class Home extends Component{
    constructor(props) {
        super(props);        
    }
    accountLogin = (e) => {
        e.preventDefault();
        var user = {};
        user.username = e.target.username.value;
        user.password = e.target.password.value;
        this.props.login(user)
        .then(res => {
            if(res.data.message && res.data.message == 'success'){
                auth.setToken(res.data.token);
                auth.setItem('passport', res.data.passport);
                this.props.loginSuccess(res.data);
                route('/preview', true);
            }
        })
        .catch(error => {
            this.props.loginError(error);
        });
    }
    render(){
        return (
        <div class="container-full">
            <div class="landing row">
            <div id="login">
                <form onSubmit={this.accountLogin}>
                    <p id="user-credential">Username</p>
                    <input type="text" name="username" id="username" placeholder="Enter Username" />
                    <p id="pass-credential">Password</p>
                    <input type="password" name="password" id="password" placeholder="Enter Password" />
                    <button id="login-button" name="submit">Login</button>
                </form>
                <Link href="/">Forget Password</Link> |  <Link href="/register">Join us</Link>
            </div>
            </div>
        </div>
        );
    }
}
const mapStateToProps = ({home}) => {
    return {
        user: home.user
    }
}
export default connect(mapStateToProps, {
    login, loginSuccess, loginError
})(Home)