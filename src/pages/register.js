import { h, Component } from 'preact';
import { route } from 'preact-router';
import spinner from '@/public/assets/loader.gif';
import registerReducer, { 
    fetchRegistrationForm, 
    updateControls, 
    openModal, 
    closeModal,
    selectedBox,
    savePreview,
    registerUser,
    registerUserSuccess,
    registerUserError,
    saveBlob,
    getPartyOffices
 } from '@/modules/register-ducks';
import '@/public/styles/register.scss';
import { connect } from 'preact-redux';
import { addReducer } from '@/components/add-reducer';
import Input from '@/components/controls';
import auth  from "@/utils/auth";
import config  from "@/utils/config";
import utils from '@/utils/utils';
import loadImage from 'blueimp-load-image';
import Croppr from 'croppr';
let leader = config.url + "/assets/owelle.jpg";
let chairman = config.url + "/assets/chair.jpg";

class Register extends Component{
    register = (e) => {
        e.preventDefault();
        let { controls, saveBlob } = this.props;
        let isValid = true;
        Object.keys(this.props.controls).map(key => {
            if(!!controls[key].value == false && key !=='id') {
                isValid = false;
                controls[key].error = 'value is required';
                if(controls[key].type.toLowerCase() !== 'file'){
                    controls[key].attributes.class += ' error';
                }
                controls[key].attributes.hintclass += ' texterror';
            }
        });
        this.props.updateControls(controls, utils.guid());
        //do registration if successful
        if(isValid){
            this.props.registerUser()
            .then(res => {
                if(res.data.message && res.data.message === 'success'){
                  this.props.registerUserSuccess(res.data);
                  auth.setToken(res.data.token);
                  auth.setItem('passport', res.data.passport);
                  route('/profile');
                }else{
                    let userError = {};
                    for(var field in res.data){
                        if(res.data.hasOwnProperty(field)){
                            if(utils.isObject(res.data[field])){
                                userError[field] = res.data[field];
                                let errordata = Object.values(res.data[field]);
                                controls[field].error = errordata[0];
                                if(controls[field].type.toLowerCase() !== 'file'){
                                    controls[field].attributes.class += ' error';
                                }
                                controls[field].attributes.hintclass += ' texterror';
                            }
                        }
                    }
                    this.props.registerUserError(userError);
                    this.props.updateControls(controls, utils.guid());
                }
              })
              .catch(error => {
                this.props.registerUserError(error);
              });
        } 
    }
    handleChange = (e) => {
        let { controls, updateKey, offices } = this.props;
        updateKey = utils.guid();
        let small = e.target.parentNode.parentNode.querySelector('small');
        controls[e.target.name].value = e.target.value;
        if(e.target.type === 'radio' && e.target.name === 'party_posit'){
            controls.office.value_options = offices[e.target.value];
            this.props.updateControls(controls);
        }
        if(utils.hasClass(e.target, 'error')){
            utils.removeClass(e.target, 'error');
            utils.removeClass(small, 'texterror');
            small.innerHTML = controls[e.target.name].hint;
            controls[e.target.name].error = null;
            if(e.target.type !== 'radio'){
                controls[e.target.name].attributes.class = 'input';
            }
            controls[e.target.name].attributes.hintclass = 'help';
        }
        this.props.updateControls(controls, updateKey);
	}
    displayControls = (controls) => {
        let { modalOpen } = this.props;
        if(controls){
            controls = utils.sortObjects(controls, 'order');
            return Object.keys(controls).map(key => {
                return ( 
                    <div class="control">
                        { controls[key].type.toLowerCase() !=='file' && !modalOpen && <Input control={controls[key]} change={this.handleChange} />}
                        { controls[key].type.toLowerCase() ==='file' && <Input control={controls[key]} change={this.selectImage} modalOpen={modalOpen} cropImage={this.cropImage} cancelCrop={this.cancelCrop} />}
                    </div>
                )
            })
        }
    }
    cancelCrop = (e) => {
        e.preventDefault();
        this.props.closeModal();        
        this.props.controls.passport.value = '';
        //reset the file input
        var passport = document.querySelector('#passport');
        passport.value = '';
        var passview = document.querySelector('#passview');
        passview.insertAdjacentElement('afterBegin', this.props.preview);
        var containa = document.querySelectorAll('.croppr-container');
        if(containa.length){
            Array.prototype.forEach.call( containa, function( node ) {
                node.parentNode.removeChild( node );
            });
        }
    }
    cropImage = (control) => {
        if(control.info){
            control.hint = control.info;
        }
        let { cropbox, closeModal, saveBlob, controls } = this.props;
        var image = document.querySelector('.croppr-image');
        var tnCanvas = document.createElement('canvas');
        var newWidth = cropbox.width;
        var newHeigth = cropbox.height;
        tnCanvas.width = newWidth;          
        tnCanvas.height = newHeigth;
        var tnCtx = tnCanvas.getContext('2d');
        var bufferCanvas = document.createElement('canvas');
        var bufferCtx = bufferCanvas.getContext('2d');
        
        bufferCanvas.width = image.width + 1000;
        bufferCanvas.height = image.height + 1000;
        bufferCtx.drawImage(image, 0, 0);
        tnCtx.drawImage(bufferCanvas, 
                cropbox.x, 
                cropbox.y,
                newWidth, newHeigth,
                0, 0, newWidth, newHeigth);
        var prevew = document.createElement('img');
        prevew.id = 'prevew';
        prevew.src = tnCanvas.toDataURL("image/jpeg");
        //save the passport
        saveBlob(prevew.src);
        controls.passport.value = this.dataURLtoBlob(prevew.src);

        var passview = document.querySelector('#passview');
        var containa = document.querySelectorAll('.croppr-container');
        if(containa.length){
            Array.prototype.forEach.call( containa, function( node ) {
                node.parentNode.removeChild( node );
            });
        }
        closeModal();
        passview.insertAdjacentElement('afterBegin', prevew);
    }
    selectImage = (e) => {
        var imgPrevew = document.querySelector('#prevew');
        if(imgPrevew){
            this.props.savePreview(imgPrevew);
            imgPrevew.parentNode.removeChild(imgPrevew);
        }
        let { selectedBox, openModal } = this.props;
        var prevew = document.createElement('img');
        prevew.id = 'prevew';
        var containa = document.querySelectorAll('.croppr-container');
        var passview = document.querySelector('#passview');
        passview.insertAdjacentElement('afterBegin', prevew);
        if(containa.length){
            Array.prototype.forEach.call( containa, function( node ) {
                node.parentNode.removeChild( node );
            });
        }    
        var loadingImage = loadImage(
            e.target.files[0],
            function (img) {
                prevew.src = img.toDataURL("image/jpeg"); 
                prevew.style.display = 'block';
                var croppr = new Croppr('#prevew', {
                    aspectRatio: 1,
                    onCropEnd: function(data){
                       selectedBox(data);
                    },
                    onInitialize: function(instance){
                        selectedBox(instance.getValue());                            
                    }
                });
                openModal();                   
            },
            {
                maxHeight: 400,
                canvas: true,
                pixelRatio: window.devicePixelRatio,
                downsamplingRatio: 0.3,
                orientation: true
            }
        );
        if (!loadingImage) {
            console.log('image failed to load'); 
            return;      
        }
    }
    dataURLtoBlob = (dataurl) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }            
        return new Blob([u8arr], {type:mime});
    }
    dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    componentDidMount(){
        this.props.fetchRegistrationForm();
    }
    componentDidUpdate(prevProps, prevState){
        var passview = document.querySelector('#passview');
        var preview = document.querySelector('#prevew');
        if(passview && this.props.photo && !preview){ 
            var prevew = document.createElement('img');
            prevew.id = 'prevew';
            prevew.src = this.props.photo;
            passview.insertAdjacentElement('afterBegin', prevew);
        }
    }
    render(){
        let {controls, modalOpen, isRegistering, loading} = this.props;        
        return (
            <div class="container full-h">
                <div class="row">
                    <div class="left-col">
                        <img src={leader} className="resive rounded" />State Governor
                    </div>
                    <div class="content border">
                        {(loading === true || isRegistering === true) ? 
                            <div className="spinner">
                                <img src={spinner} alt="loading"/>				
                            </div>
                             : 
                            <form class="" onSubmit={this.register}>
                                {this.displayControls(controls)}
                                { !!controls && controls.hasOwnProperty('id') && !modalOpen && <button class="btn">Register</button>}
                            </form>
                        }
                    </div>
                    <div class="right-col">
                     <img src={chairman} className="resive rounded"/> State Chairman
                   </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ register }) => {
    if(!register)
        return {};
    
    return {
        controls: register.controls,
        loading: register.loading,
        error: register.error,
        modalOpen: register.modalOpen || false,
        updateKey: register.updateKey,
        cropbox: register.cropbox,
        isRegistering: register.isRegistering,
        preview: register.preview,
        offices: register.offices,
        user: register.user,
        photo: register.photo
    }
} 

Register = addReducer('register', registerReducer)(Register);
export default connect(mapStateToProps, {
    fetchRegistrationForm, 
    updateControls,
    openModal,
    closeModal,
    selectedBox,
    savePreview,
    registerUser,
    registerUserSuccess,
    registerUserError,
    saveBlob,
    getPartyOffices
})(Register);
