import axios from 'axios';
import config from '@/utils/config';
import Cookie from 'js-cookie';
export const TX = axios.create({
        baseURL: config.url,
        'Content-Type': 'text/plain',
        withCredentials: true
    });
    
 TX.interceptors.request.use(
    config => {
        config.headers.authorization = Cookie.get("token") || '';
        return config;
    },
    error => Promise.reject(error)
  );

  let isAlreadyFetchingAccessToken = false
let subscribers = []

// function onAccessTokenFetched(access_token) {
//   subscribers = subscribers.filter(callback => callback(access_token))
// }

// function addSubscriber(callback) {
//   subscribers.push(callback)
// }

// axios.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   const { config, response: { status } } = error
//   const originalRequest = config

//   if (status === 401) {
//     if (!isAlreadyFetchingAccessToken) {
//       isAlreadyFetchingAccessToken = true
//       store.dispatch(fetchAccessToken()).then((access_token) => {
//         isAlreadyFetchingAccessToken = false
//         onAccessTokenFetched(access_token)
//       })
//     }

//     const retryOriginalRequest = new Promise((resolve) => {
//       addSubscriber(access_token => {
//         originalRequest.headers.Authorization = 'Bearer ' + access_token
//         resolve(axios(originalRequest))
//       })
//     })
//     return retryOriginalRequest
//   }
//   return Promise.reject(error)
// });

export const FDT = (payload) => {
    var formdata = new FormData();
    Object.keys(payload).forEach(key =>{
        formdata.append(key, payload[key]);
    });
    return formdata;
}