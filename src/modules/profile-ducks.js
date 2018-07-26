import { TX } from '@/utils/tx';
import utils from '@/utils/utils';

import { keducer as profileReducer, Types } from '@/utils/keducer';

export const PROFILE = 'profile/PROFILE';
export const PROFILE_REQUEST = Types('profile', 'PROFILE_REQUEST');

export default profileReducer('profile');

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
      user,
      error: null
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