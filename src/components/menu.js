import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import '@/public/styles/menu.scss';
import utils from '@/utils/utils';
// import { updateStatus } from '@/modules/home-ducks';
import { connect } from 'preact-redux';
import auth from '@/utils/auth';

class Menu extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        // this.props.updateStatus(auth.isLoggedIn());
    }
    closeMenu = e => {
        var navbarMenu = document.getElementById('navbar-menu');
        var navbarUser = document.getElementById('navbar-user');  
        utils.removeClass(navbarMenu, 'block');
        utils.removeClass(navbarUser, 'block');
    }
    logout = e =>{
        e.preventDefault();
        auth.logout();
        // this.props.updateStatus(auth.isLoggedIn());
        route('/');
    }
    render() {
        let { connected } = this.props;
      return (
        <div class="container">
            <a href="#" id="menu-icon" class="bw-icon icon-menu"></a>
            <a href="#" id="user-icon" class="bw-icon icon-user"></a>
            <ul id="navbar-menu">
                <li><Link onClick={this.closeMenu} href="/">Login</Link></li>
            </ul>
            <ul id="navbar-user">
                { !connected && <li> <b>Register</b>&nbsp;
                {"{"}&nbsp;<Link onClick={this.closeMenu} href="/users/register">Student</Link> | <Link onClick={this.closeMenu} href="/users/xregister">Staff</Link>&nbsp;{"}"}
                </li> 
             }
                { connected && <span>
                    <li><Link onClick={this.closeMenu} href="/posts">Write</Link></li>
                    <li><Link onClick={this.closeMenu} href="/profile">Profile</Link></li>
                    <li><Link href="#" onClick={this.logout}>Logout</Link></li>
                </span> 
                }
            </ul>
        </div>
      );
    }
}
// const mapStateToProps = ({ home }) => {
//     return {
//         connected: home.connected
//     }
// }

export default Menu;

// connect(mapStateToProps, {
//     updateStatus
// })(Menu);