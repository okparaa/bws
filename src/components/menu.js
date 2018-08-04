import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import '@/public/styles/menu.scss';
import utils from '@/utils/utils';
import { updateStatus } from '@/modules/home-ducks';
import { connect } from 'preact-redux';
import auth from '@/utils/auth';

class Menu extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.updateStatus(auth.isLoggedIn());
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
        this.props.updateStatus(auth.isLoggedIn());
        route('/');
    }
    render() {
        let { connected } = this.props;
      return (
        <div id="nav" class="row">
            <a href="#" id="menu-icon" class="bw-icon icon-menu"></a>
            <a href="#" id="user-icon" class="bw-icon icon-user"></a>
            <ul id="navbar-menu">
                <li><Link onClick={this.closeMenu} href="/">Home</Link></li>
                <li><Link onClick={this.closeMenu} href="/">Events</Link></li>
                <li><Link onClick={this.closeMenu} href="/">Politics</Link></li>
                </ul>
            <ul id="navbar-user">
                { !connected && <span>
                    <li><Link onClick={this.closeMenu} href="/">Login</Link></li>
                    <li><Link onClick={this.closeMenu} href="/register">APC Register</Link></li>
                </span> 
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
const mapStateToProps = ({ home }) => {
    return {
        connected: home.connected
    }
}

export default connect(mapStateToProps, {
    updateStatus
})(Menu);