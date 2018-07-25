import axios from 'axios';
import config from '@/utils/config';
import Cookie from 'js-cookie';
export const TX = axios.create({
        baseURL: config.url,
        'Content-Type': 'text/plain',
    });
    
 TX.interceptors.request.use(
    config => {
        config.headers.authorization = Cookie.get("token") || '';
        return config;
    },
    error => Promise.reject(error)
  );
      
export const FDT = (payload) => {
    var formdata = new FormData();
    Object.keys(payload).forEach(key =>{
        formdata.append(key, payload[key]);
    });
    return formdata;
}