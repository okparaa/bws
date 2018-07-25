import { h, Component } from 'preact';
import '@/public/styles/preview.scss';
import { connect } from 'preact-redux';
import  previewReducer, 
        {   profile,
            profileRequestSuccess, 
            profileRequestError 
        } from '@/modules/preview-ducks';
import { addReducer } from '@/components/add-reducer';

class Preview extends Component{
    componentWillMount(){
        this.props.profile()
        .then(res => {
            if( !!res.data.message && res.data.message === 'success' ){
                this.props.profileRequestSuccess(res.data);               
            }else{
                route('/register');
            }
        })
        .catch(error => {
            this.props.profileRequestError(error);
        });
    }
   
    render(){

        return (
            <div class="container full-h">
                <div class="row">
                    <div class="leftside">
                        this is the left side
                    </div>
                    <div class="content">
                        
                    </div>
                    <div class="rightside">
                        this is the right side
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({preview}) => {
    if(!preview)
        return {};

    return {
        user: preview.user
    }
}
Preview = addReducer('preview', previewReducer)(Preview);
export default connect(mapStateToProps, {
    profile,
    profileRequestSuccess,
    profileRequestError
})(Preview);