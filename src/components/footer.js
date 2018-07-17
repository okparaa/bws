import {h, Component } from 'preact';
export default class Footer extends Component {
    render(props) {
        return (
            props.url !== "/" ? 
            <div class="container-full">
                <div class="row">
                    <div id="date">&copy; all rights reserved.</div>
                </div>
            </div> 
            :
            null 
        );
    }
}