import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import '@/public/styles/menu.scss';
import utils from '@/utils/utils';
import { updateStatus } from '@/modules/home-ducks';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import auth from '@/utils/auth';


class Menu extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.updateStatus(auth.isLoggedIn());
    }
    logout = (e) =>{
        e.preventDefault();
        auth.logout();
        this.props.updateStatus(auth.isLoggedIn());
        route('/');
    }
    toggle(e){
        if(e.target.id == 'menu-icon'){
            var navbarMenu = document.getElementById('navbar-menu');
            var navbarUser = document.getElementById('navbar-user');
            if(utils.hasClass(navbarUser, 'block')){
                utils.removeClass(navbarUser, 'block');
            }
            utils.toggle(navbarMenu, 'block');
        }else if(e.target.id == 'user-icon'){
            var navbarMenu = document.getElementById('navbar-menu');
            var navbarUser = document.getElementById('navbar-user');
            if(utils.hasClass(navbarMenu, 'block')){
                utils.removeClass(navbarMenu, 'block');
            }
            utils.toggle(navbarUser, 'block');
        }else {
            var links = document.getElementById('links');
            var accounts = document.getElementById('accounts');
            var navbar = document.getElementById('nav');    
            var isClickInside = navbar.contains(event.target);
            if (!isClickInside) {
                utils.removeClass(links, 'open');
                utils.removeClass(accounts, 'open');
                utils.removeClass(nav, 'opened');
            }
        }
    }
    render() {
        let { connected } = this.props;
      return (
        <div id="nav" class="row">
            <a href="#" id="menu-icon" class="bw-icon icon-menu" onClick={this.toggle}></a>
            <a href="#" id="user-icon" class="bw-icon icon-user" onClick={this.toggle}></a>
            <ul id="navbar-menu">
                <li> <Link href="/">Home</Link></li>
                <li><Link href="/">Events</Link></li>
                <li><Link href="/">Politics</Link></li>
                </ul>
            <ul id="navbar-user">
                { !connected && <span>
                    <li><Link href="/">Login</Link></li>
                    <li><Link href="/register">Register</Link></li>
                </span> 
                }
                { connected && <span>
                    <li><Link href="/posts">Write</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
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