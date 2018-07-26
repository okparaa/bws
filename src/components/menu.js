import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import '@/public/styles/menu.scss';
import utils from '@/utils/utils';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { auth } from '@/utils/auth';

class Menu extends Component {
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
    render(props, state) {
        let { connected } = props;
      return (
        <div id="nav" class="row">
            <a href="#" id="menu-icon" class="bw-icon" onClick={this.toggle}>&#xf0c9;</a>
            <a href="#" id="user-icon" class="bw-icon" onClick={this.toggle}>&#xe800;</a>
            <ul id="navbar-menu">
                <li> <Link href="/">Home</Link></li>
                <li><Link href="/profile">Profile</Link></li>
                <li><Link href="/events">Events</Link></li>
                <li><Link href="/politics">Politics</Link></li>
                <li><Link href="/business">Business</Link></li>
                </ul>
            <ul id="navbar-user">
                { !connected && <span>
                    <li><Link href="/">Login</Link></li>
                    <li><Link href="/register">Join Us</Link></li>
                </span> 
                }
                { connected && <span>
                    <li><Link href="/profile"> <img src=""/></Link></li>
                    <li><Link href="/logout">Logout</Link></li>
                </span> 
                }
            </ul>
        </div>
      );
    }
}
const mapStateToProps = state => {
    return {
        account: state.account
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);