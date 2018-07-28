import { h, Component } from 'preact';
import '@/public/styles/profile.scss';
import { connect } from 'preact-redux';
import auth from '@/utils/auth';
import { route } from 'preact-router';
let photo = "http://ugwumba.org/uploads/"+ auth.getItem('passport');
let logo = "http://ugwumba.org/assets/apclogo.jpg";
import  profileReducer, 
        {   profile,
            profileRequestSuccess, 
            profileRequestError 
        } from '@/modules/profile-ducks';
import { addReducer } from '@/components/add-reducer';

class Profile extends Component{
    componentWillMount(){
        this.props.profile()
        .then(res => {
            if( !!res.data.message && res.data.message === 'success' ){
                this.props.profileRequestSuccess(res.data);               
            }else{
                this.props.profileRequestError(res.data);
                route('/');
            }
        })
        .catch(error => {
            console.log(error);
            // this.props.profileRequestError(error);
        });
    }
   
    render(){
        let { user } = this.props;
        return (
            <div class="container full-h">
                <div class="profile-left">
                    this is the left side
                </div>
                <div class="profile border">
                <div className="row border-btm">
                    <div className="apclogo"><img className="resive round" src={photo} alt=""/></div>
                    <div className="apcname border-btm">
                        <div className="apc border-btm">ALL PROGRESSIVES CONGRESS</div>
                        <div className="border-btm">Owerri, Imo State</div>
                        <div className="">Membership Validation</div>
                    </div>
                    <div className="apcmbrpix"><img className="resive" src={logo} alt=""/></div>
                </div>
                { !!user && Object.keys(user).map(key => {
                    return key !== 'passport' && key !== 'message' &&
                    <div className="row border-btm">
                        <div className="bioprop">{key.toUpperCase()}</div>
                        <div className="bioname">{user[key].toUpperCase()}</div>
                    </div>
                    
                })
                }                    
                </div>
                <div class="profile-right">
                    this is the right side
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({profile}) => {
    if(!profile)
        return {};

    return {
        user: profile.user
    }
}
Profile = addReducer('profile', profileReducer)(Profile);
export default connect(mapStateToProps, {
    profile,
    profileRequestSuccess,
    profileRequestError
})(Profile);