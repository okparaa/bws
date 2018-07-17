import { keducer as homeReducer, Types }  from '../../utils/keducer';

export default homeReducer('home');

export const GET_LOGIN_STATUS = 'home/GET_LOGIN_STATUS';
export const SET_LOGIN_STATUS = 'home/SET_LOGIN_STATUS';