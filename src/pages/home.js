import { h, Component } from 'preact';
import FbLogin from '@/components/facebook'
import { Link } from 'preact-router/match';
import { getUser } from '@/modules/home/home-ducks';
import Menu from '@/components/menu';
import '@/public/styles/home.scss';

export default class Home extends Component{
    constructor(props) {
        super(props);        
    }
    accountLogin = (e) => {
        e.preventDefault();
        console.log(e.target.username.value)
        console.log(e.target.password.value)
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