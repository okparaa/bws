import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { login, loginSuccess, loginError, updateError } from '@/modules/home-ducks';
import '@/public/styles/home.scss';
import { connect } from 'preact-redux';
import { route } from 'preact-router';
import auth from '@/utils/auth';
import config from '@/utils/config';
let leader = config.url + "/assets/owelle.png";
let chairman = config.url + "/assets/chair.png";
import loading from "@/public/assets/loading.gif";

class Home extends Component{
    constructor(props) {
        super(props);        
    }
    accountLogin = (e) => {
        e.preventDefault();
        var user = {};
        this.props.updateError(false);
        user.username = e.target.username.value;
        user.password = e.target.password.value;
        this.props.login(user)
        .then(res => {
            if(res.data.message && res.data.message == 'success'){
                auth.setToken(res.data.token);
                auth.setItem('passport', res.data.passport);
                this.props.loginSuccess(res.data);
                route('/profile');
            }else{
                this.props.loginError(res.data);
                this.props.updateError(true);
            }
        })
        .catch(error => {
        });
    }
    render(){
        return (
        <div class="container-full">
            <div class="row">
                <div class="leader"><img src={leader} className="resive rounded" />State Governor</div>
                <div class="spacer" >&nbsp;.</div>
                <div class="chairman"><img src={chairman} className="resive rounded"/> State Chairman</div>
            </div>
            <div class="landing row">
            <div id="login">
                { this.props.loginErr ?  
                    <div style={{textAlign: 'center', color: 'yellow'}}>Wrong! Try again</div>
                    : 
                    <div>&nbsp;</div>
                }
                <form onSubmit={this.accountLogin}>
                    <p id="user-credential">Username</p>
                    <input type="text" name="username" id="username" placeholder="Enter Username" />
                    <p id="pass-credential">Password</p>
                    <input type="password" name="password" id="password" placeholder="Enter Password" />
                    <button id="login-button" name="submit">
                    {this.props.processing ? <img src={loading} /> : "Login"}
                    </button>
                </form>
                <Link href="/">Forget Password</Link> |  <Link className="blink" href="/register">Join APC</Link>
            </div>
            </div>
        </div>
        );
    }
}
const mapStateToProps = ({home}) => {
    return {
        user: home.user,
        loginErr: home.loginErr,
        processing: home.processing
    }
}
export default connect(mapStateToProps, {
    login, loginSuccess, loginError, updateError
})(Home)