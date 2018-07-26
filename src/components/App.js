import {h, Component } from 'preact';
import { Router, route, getCurrentUrl } from 'preact-router';
import AsyncRoute  from '@/components/async-route';
import '@/public/styles/app.scss';
import Home from '@/pages/home';
import Footer from '@/components/footer';
import Header from '@/components/header';
export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {url: getCurrentUrl()};
    }
    handleRoute = e => {
        this.setState({url: e.url});
    }
    Register = async () => {
        const module = await import(
           /* webpackChunkName: "chunk-register" */ `@/pages/register`
        );
        return module.default;
    };
    Profile = async () => {
        const module = await import(
           /* webpackChunkName: "chunk-preview" */ `@/pages/profile`
        );
        return module.default;
    };
    Posts = async () => {
        const module = await import(
           /* webpackChunkName: "chunk-posts" */ `@/pages/posts`
        );
        return module.default;
    };
    render(props){
        let appClass = this.state.url === "/" ? "home" : "app";
        return (
            <div class={appClass}>
            <Header url={this.state.url} />
            <Router onChange={this.handleRoute}>
                <Home path="/" />
                <AsyncRoute path="/register" getComponent={this.Register} />
                <AsyncRoute path="/profile" getComponent={this.Profile} />
                <AsyncRoute path="/posts" getComponent={this.Posts} />
            </Router>
            <Footer url={this.state.url}/>
            </div>
        )
    }
}
