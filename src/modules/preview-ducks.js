import { TX } from '@/utils/tx';
import utils from '@/utils/utils';

import { keducer as previewReducer, Types } from '@/utils/keducer';

export const PROFILE = 'preview/PROFILE';
export const PROFILE_REQUEST = Types('preview', 'PROFILE_REQUEST');

export default previewReducer('preview');

export const profileRequestPending = () => ({
    type: PROFILE_REQUEST.PENDING,
    payload: {
      isFetchingMe: true  
    }
});
export const profileRequestSuccess = (user) => ({
    type: PROFILE_REQUEST.SUCCESS,
    payload: {
      isFetchingMe: false,
      user 
    }
});
export const profileRequestError = (error) => ({
    type: PROFILE_REQUEST.ERROR,
    payload: {
      isFetchingMe: false,
      error  
    }
});
export const profile = () => dispatch => {
    dispatch(profileRequestPending());
    return TX.get('/accounts/profile');
}