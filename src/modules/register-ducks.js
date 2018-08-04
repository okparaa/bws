import { TX, FDT } from '@/utils/tx';

import { keducer as registerReducer, Types } from '@/utils/keducer';

export const REGISTRATION_FORM = Types('register', 'REGISTRATION_FORM');
export const UPDATE_CONTROLS = 'register/UPDATE_CONTROLS';
export const SET_MODAL = 'register/SET_MODAL';
export const SET_CROP_BOX = 'register/SET_CROP_BOX';
export const SAVE_BLOB = 'register/SAVE_BLOB';
export const SET_PREVIEW = 'register/SET_PREVIEW';
export const CONNECTION = 'home/CONNECTION';
export const REGISTER_USER = Types('register', 'REGISTER_USER');
export const REGISTER_OFFICE = Types('register', 'REGISTER_OFFICE');

export default registerReducer('register');

export const openModal = () => ({
  type: SET_MODAL,
  payload: {
    modalOpen: true
  }
})
export const savePreview = (preview) => ({
  type: SET_PREVIEW,
  payload: {
    preview
  }
})
export const selectedBox = (cropbox) => ({
  type: SET_CROP_BOX,
  payload: {
    cropbox
  }
})
export const saveBlob = (blob) => ({
  type: SAVE_BLOB,
  payload: {
    photo: blob
  }
})
export const closeModal = () => ({
  type: SET_MODAL,
  payload: {
    modalOpen: false
  }
})
export const registrationFormRequest = () => ({
  type: REGISTRATION_FORM.PENDING,
  payload: {
    loading: true,
    error: null
  }
})

export const updateControls = (controls, updateKey) => ({
  type: UPDATE_CONTROLS,
  payload: {
    controls,
    updateKey
  }
})
export const registrationFormSuccess = (response) => ({
  type: REGISTRATION_FORM.SUCCESS,
  payload: {
    controls: response[0],
    offices: response[1],
    loading: false,
    error: null
  }
})
export const registrationFormError = (error) => ({
  type: REGISTRATION_FORM.ERROR,
  payload: {
    loading: false,
    controls: [],
    error
  }
})
export const fetchRegistrationForm = () => dispatch => {
  dispatch(registrationFormRequest());  
  TX.get('/accounts/register')
  .then( res => {
    dispatch(registrationFormSuccess(res.data));
  })
  .catch( error => {
    dispatch(registrationFormError(error));
  });
}

export const registerUserRequest = () => ({
  type: REGISTER_USER.PENDING,
  payload: {
    isRegistering: true,
  }
})
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER.SUCCESS,
  payload: {
    isRegistering: false,
    user: user
  }
})
export const registerUserError = (error) => ({
  type: REGISTER_USER.ERROR,
  payload: {
    isRegistering: false,
    error
  }
})
export const registerUser = () => (dispatch, getState) => {
  dispatch(registerUserRequest());
  let controls = getState().register.controls;
  let data = {};
  Object.keys(controls).map(key => {
    data[key] = controls[key].value;
  });
  return TX.post('/accounts/register', FDT(data));
}

