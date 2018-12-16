import {h, Component } from 'preact';
import { Router, route, getCurrentUrl } from 'preact-router';
import LiquidRoute  from '@/components/liquid-route';
import fadeAnimation from '@/components/fade-animation';
import '@/public/styles/app.scss';
import Footer from '@/components/footer';
import Header from '@/components/header';
import utils from '@/utils/utils';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {url: getCurrentUrl()};
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
            var navbarMenu = document.getElementById('navbar-menu');
            var navbarUser = document.getElementById('navbar-user');  
            utils.removeClass(navbarMenu, 'block');
            utils.removeClass(navbarUser, 'block');
        }
    }
    handleRoute = e => {
        this.setState({url: e.url});
    }
    Index = async () => {
        const module = await import (
           /* webpackChunkName: "chunk-index" */ `@/pages/index-pages/index`            
        );
        return module.default;
    } 

    Register = async () => { 
        const module = await import( 
            /* webpackChunkName: "chunk-register" */ `@/pages/users-pages/register`
        ); 
        return module.default; 
    };
    GetResult = async () => { 
        const module = await import( 
            /* webpackChunkName: "chunk-get-result" */ `@/pages/users-pages/get-result`
        ); 
        return module.default; 
    };
    // __component__
    render(props){
        let appClass = this.state.url === "/" ? "home" : "app";
        return (
            <div class={appClass} onClick={this.toggle}>
            <Header url={this.state.url} />
            <Router onChange={this.handleRoute}>
                <LiquidRoute animator={fadeAnimation} getComponent={this.Index} path="/" />
                <LiquidRoute animator={fadeAnimation} path="/users/register" getComponent={this.Register} />
                <LiquidRoute animator={fadeAnimation} path="/users/get-result" getComponent={this.GetResult} />
                {/* __componentElement__ */}
            </Router>
            <Footer url={this.state.url}/>
            </div>
        )
    }
}
