import { h, Component } from "preact";
import * as fbk from '@/utils/fbfxns';
import fbkicon from '@/public/assets/fbk-icon.png';

export default class Facebook extends Component {
    constructor(){
        super();
        this.state = {
            loading: false
        }
    }
    doLogin = () => {
        this.setState({
            loading: true
        }, () => {
            fbk.promises.init()
                .then(
                    fbk.promises.checkLoginState,
                    error => { throw error; }
                )
                .then(
                    response => { this.setState({status: response.status}); },
                    fbk.promises.login
                )
                .then(
                    fbk.promises.fetch,
                    error => { throw error; }
                )
                .then(
                    response => { this.setState({loading: false, data: response, status: 'connected'}); },
                    error => { throw error; }
                )
                .catch((error) => { 
                    this.setState({loading: false, data: {}, status: 'unknown'});
                    console.warn(error); 
                });
        });
    }
    doLogout = () => {
        this.setState({
            loading: true
        }, () => {
            fbk.promises.init()
                .then(
                    fbk.promises.checkLoginState,
                    error => { throw error; }
                )
                .then(
                    fbk.promises.logout,
                    error => { this.setState({data: {}, status: 'unknown'}); }
                )
                .then(
                    response => { this.setState({loading: false, data: {}, status: 'unknown'}); },
                    error => { throw error; }
                )
                .catch(error => { 
                    this.setState({loading: false, data: {}, status: 'unknown'});
                    console.warn(error); 
                });
        });
    }
    checkStatus = () => {
        this.setState({
            loading: true
        }, () => {
            fbk.promises.init()
                .then(
                    fbk.promises.checkLoginState,
                    error => { throw error; }
                )
                .then(
                    response => { this.setState({status: response.status}); },
                    error => { throw error; }
                )
                .then(
                    fbk.promises.fetchUser,
                    error => { throw error; }
                )
                .then(
                    response => { this.setState({loading: false, data: response, status: 'connected'}); },
                    error => { throw error; }
                )
                .catch((error) => { 
                    this.setState({loading: false, data: {}, status: 'unknown'});
                    console.warn(error); 
                });
        });
    }
    componentDidMount() {
        this.checkStatus();
    }
    getInitialState() {
        return {
            status: 'unknown',
            loading: false,
            data: {}
        };
    }
    render() {
        const loading = this.state.loading ? <p>Please wait, loading ...</p> : null;
        const message = this.state.status === 'connected'
            ? (<div>
                Hi {data.name}!
                <button onClick={this.doLogout}>Logout</button>
                </div>)
            : (<div onClick={this.doLogin} id="spinner" style="font-size: 16px; font-weight: bold; cursor: pointer; padding-top: 7px; background: #4267b2;border-radius: 5px;color: white; height: 40px; text-align: center; width: 100%;">
                <img src={fbkicon} style="vertical-align: middle; margin: 0 0 4px 0px" /> <span> Login with Facebook </span>
                <div class="text-center text-bold" style="font-size: 16px; margin: 15px 0 0 0;">OR</div>
              </div>);
        return (
            <div>
                {message}
            </div>
        );
    }
}